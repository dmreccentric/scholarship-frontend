"use client";

import { useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { Visa } from "../../types";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import EnquiryModal from "@/app/components/EnquiryModal";

interface Props {
  data: Visa;
  related: Visa[];
  recent: Visa[];
}

export default function VisaClient({ data, related, recent }: Props) {
  const [showModal, setShowModal] = useState(false);
  const imageUrl =
    typeof data.image === "string" ? data.image : data.image?.url;

  return (
    <article
      className="space-y-12"
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* ✅ JSON-LD Structured Data for SEO */}
      <Script
        id="visa-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: data.title,
            description: data.description,
            image:
              typeof data.image === "string"
                ? data.image
                : data.image?.url || "https://yoursite.com/default-visa.jpg",
            brand: { "@type": "Brand", name: data.country },
            offers: {
              "@type": "Offer",
              price: data.fee || "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              url: `https://yoursite.com/visas/${data._id}`,
            },
          }),
        }}
      />

      {/* ✅ Hero Section */}
      {imageUrl && (
        <figure className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={imageUrl}
            alt={data.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover"
          />
          <figcaption className="sr-only">{data.title}</figcaption>
        </figure>
      )}

      {/* ✅ Visa Information */}
      <header className="space-y-4">
        <h1 itemProp="name" className="text-4xl font-bold text-gray-900">
          {data.title}
        </h1>
        <p itemProp="brand" className="text-gray-600 text-lg">
          {data.country}
        </p>
        <p itemProp="description" className="text-gray-800 leading-relaxed">
          {data.description}
        </p>
      </header>

      {/* ✅ Requirements & Info */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
        {Array.isArray(data.requirements) && data.requirements.length > 0 && (
          <div>
            <strong>Requirements:</strong>{" "}
            <span itemProp="additionalProperty">
              {data.requirements.join(", ")}
            </span>
          </div>
        )}
        {data.processingTime && (
          <div>
            <strong>Processing Time:</strong>{" "}
            <span itemProp="productionDate">{data.processingTime}</span>
          </div>
        )}
        {data.fee && (
          <div>
            <strong>Fee:</strong>{" "}
            <span
              itemProp="offers"
              itemScope
              itemType="https://schema.org/Offer"
            >
              <meta itemProp="priceCurrency" content="USD" />
              <span itemProp="price">{data.fee}</span>
            </span>
          </div>
        )}
      </section>

      <Button className="mt-6" onClick={() => setShowModal(true)}>
        Enquire Now
      </Button>

      {/* ✅ Related Visas */}
      {related.length > 0 && (
        <section aria-labelledby="related-visas">
          <h2
            id="related-visas"
            className="text-2xl font-semibold text-gray-900"
          >
            Related Visas
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {related.map((visa) => {
              const img =
                typeof visa.image === "string" ? visa.image : visa.image?.url;
              return (
                <motion.a
                  href={`/visas/${visa._id}`}
                  key={visa._id}
                  whileHover={{ scale: 1.03 }}
                  className="rounded-xl overflow-hidden bg-white shadow-md block"
                >
                  {img && (
                    <div className="relative h-40 w-full">
                      <Image
                        src={img}
                        alt={visa.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {visa.title}
                    </h3>
                    <p className="text-sm text-gray-600">{visa.country}</p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </section>
      )}

      {/* ✅ Recently Added */}
      {recent.length > 0 && (
        <section aria-labelledby="recent-visas">
          <h2
            id="recent-visas"
            className="text-2xl font-semibold text-gray-900"
          >
            Recently Added
          </h2>
          <div className="space-y-2">
            {recent.map((visa) => {
              const img =
                typeof visa.image === "string" ? visa.image : visa.image?.url;
              return (
                <a
                  key={visa._id}
                  href={`/visas/${visa._id}`}
                  className="flex items-center gap-4 p-3 border border-gray-100 rounded-lg hover:shadow-md transition"
                >
                  {img ? (
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={img}
                        alt={visa.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 text-gray-400 flex items-center justify-center rounded-md text-xs">
                      No Image
                    </div>
                  )}

                  <div className="flex flex-col">
                    <h3 className="text-gray-800 font-medium hover:text-blue-600 transition">
                      {visa.title}
                    </h3>
                    <p className="text-sm text-gray-500">{visa.country}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      )}

      {/* ✅ Enquiry Modal */}
      <EnquiryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        itemTitle={data.title}
        type="Visa"
      />
    </article>
  );
}
