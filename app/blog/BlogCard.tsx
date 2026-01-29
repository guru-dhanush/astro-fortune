type BlogCardProps = {
  category: string;
  title: string;
  description: string;
  image: string;
  author: string;
  date: string;
  compact?: boolean; 
};

const BlogCard = ({
  category,
  title,
  description,
  image,
  author,
  date,
  compact = false,
}: BlogCardProps) => {
  return (
    <article className="border border-[#EAECF0] rounded-2xl overflow-hidden group bg-white">
      {/* Image */}
      <div className={compact ? "h-40" : "h-48"}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <span className="text-xs font-medium text-emerald-600">{category}</span>

        <h3 className="text-lg font-semibold flex justify-between items-center">
          {title}
          <span className="text-xl">↗</span>
        </h3>

        <p className="text-sm text-black/70 line-clamp-2">{description}</p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
            <img src="/kyataini.svg" alt={author} />
          </div>
          <div className="text-xs">
            <p className="font-medium">{author}</p>
            <p className="text-black/50">{date}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
