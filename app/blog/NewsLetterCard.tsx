
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const NewsLetterCard = () => (
    <div className="border border-border rounded-2xl p-6 bg-surface flex flex-col justify-between">
        <div>
            <img
                src="/telegram.svg"
                alt="telegram"
                className="border p-3 rounded-lg mb-5"
            />
            <h3 className="text-lg mb-2 font-bold">Weekly newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
                No spam. Just the latest releases and tips, interesting articles, and
                exclusive interviews in your inbox every week.
            </p>

            <Input
                type="email"
                placeholder="Enter your email"
                className="mb-3 bg-white"
            />

            <p className="text-xs text-muted-foreground">
                Read about our <span className="underline">privacy policy</span>.
            </p>
        </div>

        <Button size="lg" className="mt-4">
            Subscribe
        </Button>
    </div>
);
export default NewsLetterCard;
