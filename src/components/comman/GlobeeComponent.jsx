import React, { useEffect, useState, useRef } from "react";
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/jsvectormap.css";
import "jsvectormap/dist/maps/world.js";
import Heading from "../ui/Heading";
import { Link } from "react-router-dom";
import Img from "../ui/Img";
import direction from "@/assets/icons/direction.svg";
import Paragraph from "../ui/Paragraph";

const locations = [
  {
    title: "USA",
    location: "United States of America",
    top: "38%",
    left: "8.6%",
  },
  {
    title: "Kuwait",
    location: "Kuwait",
    top: "43%",
    left: "60%",
  },
  {
    title: "KSA",
    location: "Kingdom of Saudi Arabia",
    top: "43%",
    left: "58%",
  },
  {
    title: "Bahrain",
    location: "Bahrain",
    top: "45.5%",
    left: "60%",
  },
  {
    title: "Uae",
    location: "United Arab Emirates",
    top: "47%",
    left: "62.5%",
  },
  {
    title: "India",
    location: "India",
    top: "55%",
    left: "70%",
  },
];


export default function GlobeComponent({
  markers,
  selectedOption,
  setSelectedOption,
}) {
  const [selectedLocation, setSelectedLocation] = useState(
    markers?.find((m) => m.title === selectedOption),
  );
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = new jsVectorMap({
        selector: mapContainerRef.current,
        map: "world",
        markers: markers?.map((m) => ({
          coords: m.coords,
          name: m.title,
        })),
        zoomButtons: false,
        zoomOnScroll: true,
        zoom: 1.5,
        regionStyle: {
          initial: {
            fill: "#D4DDEE",
          },
          hover: {
            fill: "#A0A0A0",
          },
        },
        markerStyle: {
          initial: {
            fill: "#ff0000",
            stroke: "#ffffff",
            "stroke-width": 2,
            r: 4.5,
          },
        },
        onMarkerClick: (index) => {
          setSelectedLocation(markers[index]);
        },
      });
    }

    // Cleanup on unmount to avoid memory leaks
  }, [markers]);

  useEffect(() => {
    setSelectedLocation(markers?.find((m) => m.title === selectedOption));
  }, [selectedOption, markers]);

  return (
    <div className="relative w-full">
      {/* <div className="relative inline-block w-[350px] sm:w-[550px]">
        <Img src="/globalmap.jpeg" className="
  mt-10
  w-[350px] sm:w-[550px]
  transition-transform duration-500 ease-in-out
  hover:scale-105 lg:hover:scale-125
  cursor-zoom-in
"
 />

        <button
          className="min-size-3 absolute right-[125px] top-[130px] z-40 size-2 rounded-full bg-red sm:right-[200px] sm:top-[195px] sm:size-3"
          onClick={() => setSelectedOption("Kuwait")}
        />
        <button
          className="min-size-3 absolute right-[175px] top-[130px] z-40 size-2 rounded-full bg-red sm:right-[250px] sm:top-[218px] sm:size-3"
          onClick={() => setSelectedOption("KSA")}
        />
        <button
          className="min-size-3 absolute right-[95px] top-[200px] z-40 size-2 rounded-full bg-red sm:right-[160px] sm:top-[298px] sm:size-3"
          onClick={() => setSelectedOption("Uae")}
        />
        <button
          className="min-size-3 absolute right-[105px] top-[185px] z-40 size-2 rounded-full bg-red sm:right-[170px] sm:top-[268px] sm:size-3"
          onClick={() => setSelectedOption("Bahrain")}
        />
      </div> */}

      <div className="relative inline-block w-[350px] sm:w-[550px] md:w-[750px] overflow-hidden">
        <Img
          src="/globalmap.jpeg"
          className="
      w-full
      transition-transform duration-500
      hover:scale-110
      cursor-zoom-in
    "
        />

      </div>


      {selectedLocation && (
        <div className="absolute left-5 top-10 flex max-w-[320px] justify-between gap-5 rounded border bg-white p-4 shadow-lg">
          <div>
            <Heading
              children={selectedLocation.location}
              variant={"small"}
              className={
                "line-clamp-1 text-left font-medium text-blue rtl:text-right"
              }
            />
            <Paragraph
              children={selectedLocation.description}
              className={"text-sm text-gray-700"}
            />
          </div>
          <Link
            to={selectedLocation.link}
            target="_blank"
            className="min-size-6 flex-shrink-0"
          >
            <Img src={direction} className="size-5" />
          </Link>
        </div>
      )}

      {selectedLocation && (
        <div className="absolute -bottom-32 left-10 z-40 flex max-w-[320px] justify-between gap-5 rounded border bg-white p-4 shadow-lg">
          <div className="space-y-2">
            <Heading
              variant={"small"}
              className={
                "text-left font-semibold normal-case text-blue rtl:text-right"
              }
            >
              Contact Address
            </Heading>

            {selectedLocation?.physcialAddress && (
              <div>
                <Heading
                  variant={"small"}
                  className={
                    "line-clamp-1 text-left text-base normal-case text-blue lg:text-base rtl:text-right"
                  }
                >
                  Physical Address
                </Heading>
                <Paragraph
                  children={selectedLocation?.physcialAddress}
                  className={"text-sm text-gray-700"}
                />
              </div>
            )}

            {selectedLocation?.postalAddress && (
              <div>
                <Heading
                  variant={"small"}
                  className="line-clamp-1 text-left text-base normal-case text-blue lg:text-base rtl:text-right"
                >
                  Postal Address
                </Heading>
                <Paragraph
                  children={selectedLocation?.postalAddress}
                  className={"text-sm text-gray-700"}
                />
              </div>
            )}

            {selectedLocation?.phone && (
              <div>
                <Heading
                  variant={"small"}
                  className="line-clamp-1 text-left text-base font-semibold normal-case text-blue lg:text-base rtl:text-right"
                >
                  Phone
                </Heading>
                <Paragraph
                  children={selectedLocation?.phone}
                  className={"text-sm text-gray-700"}
                />
              </div>
            )}

            {selectedLocation?.email && (
              <div>
                <Heading
                  variant={"small"}
                  className="line-clamp-1 text-left text-base font-semibold normal-case text-blue lg:text-base rtl:text-right"
                >
                  Email
                </Heading>
                <Paragraph
                  children={selectedLocation?.email}
                  className={"text-sm text-gray-700"}
                />
              </div>
            )}

            {selectedLocation?.website && (
              <div>
                <Heading
                  variant={"small"}
                  className="line-clamp-1 text-left text-base font-semibold normal-case text-blue lg:text-base rtl:text-right"
                >
                  Website
                </Heading>
                <Paragraph
                  children={selectedLocation?.website}
                  className={"text-sm text-gray-700"}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
