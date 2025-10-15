"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";

type Props = {
  href: string;
  title: string;
  subtitle?: string;
  date?: string;
  image?: string;
  children?: React.ReactNode;
};

const Card: React.FC<Props> = ({
  href,
  title,
  subtitle,
  date,
  image,
  children,
}) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <Link href={href} className="block group h-full">
      <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transform transition hover:-translate-y-1 flex flex-col h-full">
        {image && (
          <div className="relative h-44 md:h-48 w-full bg-gray-100 flex-shrink-0">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={false}
            />
          </div>
        )}

        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>

            {subtitle && (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {subtitle}
              </p>
            )}

            {formattedDate && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Posted on {formattedDate}
              </p>
            )}
          </div>

          {children && <div className="mt-4">{children}</div>}
        </div>
      </article>
    </Link>
  );
};

export default Card;
