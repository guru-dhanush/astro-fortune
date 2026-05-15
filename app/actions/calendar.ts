"use server";

import { calendar } from "@/lib/google";

export async function checkAvailabilityAction(
  startTime: string,
  endTime: string
) {
  try {
    // Check if Google Calendar is configured
    if (!calendar) {
      console.log("Google Calendar not configured, skipping availability check");
      return { success: true, available: true, skipped: true };
    }

    let freeBusyRes;
    try {
      freeBusyRes = await calendar.freebusy.query({
        requestBody: {
          timeMin: startTime,
          timeMax: endTime,
          timeZone: "Asia/Kolkata",
          items: [{ id: "primary" }],
        },
      });
    } catch (apiError: any) {
      // If Google Calendar credentials are missing, skip availability check
      if (apiError?.message?.includes("No access") || apiError?.message?.includes("credentials") || apiError?.message?.includes("refresh token")) {
        console.log("Google Calendar credentials missing, skipping availability check");
        return { success: true, available: true, skipped: true };
      }
      throw apiError;
    }

    const busySlots = freeBusyRes.data.calendars?.primary?.busy;
    
    if (busySlots && busySlots.length > 0) {
      return { success: false, error: "Slot already booked" };
    }

    return { success: true, available: true };
  } catch (error: any) {
    console.error("Error checking availability:", error);
    return { success: false, error: error.message || "Failed to check availability" };
  }
}

export async function createBookingAction(
  date: string, 
  startTime: string, 
  endTime: string,
  details: {
    fullName: string;
    email: string;
    mobile: string;
    service: string;
  }
) {
  try {
    // Both startTime and endTime should be ISO strings representing the full datetime with offset
    // Check freebusy
    const freeBusyRes = await calendar.freebusy.query({
      requestBody: {
        timeMin: startTime,
        timeMax: endTime,
        timeZone: "Asia/Kolkata",
        items: [{ id: "primary" }],
      },
    });

    const busySlots = freeBusyRes.data.calendars?.primary?.busy;
    
    if (busySlots && busySlots.length > 0) {
      return { success: false, error: "Slot already booked" };
    }

    // Create event with Google Meet conference
    const event = {
      summary: `Booking: ${details.service} - ${details.fullName}`,
      description: `Client: ${details.fullName}\nEmail: ${details.email}\nMobile: ${details.mobile}\nService: ${details.service}`,
      start: {
        dateTime: startTime,
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endTime,
        timeZone: "Asia/Kolkata",
      },
      attendees: [{ email: details.email }],
      conferenceData: {
        createRequest: {
          requestId: `booking-${Date.now()}`,
          conferenceSolutionKey: {
            type: "hangoutsMeet"
          }
        }
      },
      reminders: {
        useDefault: true,
      },
    };

    const insertRes = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: "all",
    });

    const meetLink = insertRes.data.conferenceData?.entryPoints?.[0]?.uri;

    return { success: true, eventId: insertRes.data.id, meetLink };
  } catch (error: any) {
    console.error("Error creating booking:", error);
    return { success: false, error: error.message || "Failed to create booking" };
  }
}
