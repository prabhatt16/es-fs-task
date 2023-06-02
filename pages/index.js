import axios from "axios";
import ItemCard from "../components/itemCard.jsx";
import Head from "next/head";
import { useEffect, useState } from "react";

export const page = 20;
export let prevLength = 0,
  currLength = 0;

export default function Home(props) {
  const [dataList, setDataList] = useState([]);
  const [pageIncrement, setPageIncrement] = useState(page);
  const [currCountry, setCurrCountry] = useState(null);
  const [location, setLocation] = useState();
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const fetchApiData = ({ latitude, longitude }) => {

    setCurrCountry("Netherlands");
    setPageIncrement(page);
    // axios
    //   .get(
    //     `http://api.geonames.org/countryCodeJSON?lat=${latitude}&lng=${longitude}&username=${"mygeoapp166"}`
    //   )
    //   .then((e) => console.log(e))
    //   .catch((e) => console.log(e.message));
    // const data = await res.json();
    setDataList([]);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
      });
    }
  }, []);

  const getScrollPercentage = () => {
    return Math.round(
      ((window.innerHeight + document.documentElement.scrollTop + 1) /
        document.documentElement.scrollHeight) *
        100
    );
  };
  const handelScroll = () => {
    const scroll = getScrollPercentage();
    if (currCountry !== "Netherlands") {
      setScrollPercentage(scroll);
    } else {
      setScrollPercentage(0);
    }
  };

  useEffect(() => {
    if (props?.data !== null) {
      setDataList(props?.data?.data);
    } else {
      console.log("failed to get data");
    }
  }, [props]);

  useEffect(() => {
    if (scrollPercentage === 100) {
      setPageIncrement(pageIncrement + 20);
    }
  }, [scrollPercentage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      axios
        .get(
          `https://uninterested-suit-tuna.cyclic.app/getdata/${pageIncrement}`
        )
        .then((e) => {
          setDataList(e.data.data), (prevLength = currLength);
          currLength = e?.data?.data?.length;
        })
        .catch((e) => console.log(e));
    }, 2000);
    return () => clearInterval(timer);
  }, [pageIncrement, currCountry]);

  useEffect(() => {
    window.addEventListener("scroll", handelScroll);
    return () => window.removeEventListener("scroll", handelScroll);
  }, [currCountry !== "Netherlands"]);

  return (
    <div className="flex-1 mx-auto">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="titla, meta, nextjs" />
        <meta name="title" content={"es"} />
        <meta name="discription" content={"data?.description"} />
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <div className="top-0 fixed w-full z-30 bg-white">
        <div className="px-2 sm:px-7 py-3 flex flex-row justify-between items-center">
          <p
            className=" hidden sm:block font-thin cursor-pointer"
            onClick={() => {
              window.location.reload();
            }}
          >
            Home
          </p>
          <h1 className="font-bold text text-xl">Essentially Sports</h1>
          <div className="flex flex-row justify-around iten-center w-10">
            <p
              className={`cursor-pointer mr-6 ${
                currCountry !== "Netherlands"
                  ? "text-gray-500 font-extralight"
                  : "text-gray-900 font-bold"
              }`}
              onClick={() => {
                // alert("Your location is changed to netherland!");
                fetchApiData({
                  latitude: "52.132633",
                  longitude: "5.2912659999999505",
                });
              }}
            >
              {"Netherlands"}
            </p>
          </div>
        </div>
        <div className="p-1 bg-[#F75454] ">
          <p className="text-center text-white ">We're hiring!</p>
        </div>
      </div>

      <div className=" border-l border-r border-l-gray-300 border-r-gray-300 sm:w-2/3 m-auto mt-24">
        <div className="flex flex-row justify-start items-center w-full px-4 py-2">
          <h1 className="font-bold sm:text-lg ">
            {"LATEST NEWS ".replace(/ /g, "\u00A0")}
          </h1>
          <div className="border-b-2 border-b-red-500 w-full"></div>
        </div>
        <div className="flex-1 overflow-scroll">
          {dataList !== [] &&
            dataList.map((item, index) => {
              return <ItemCard key={index} data={item} />;
            })}
        </div>
      </div>
      {currCountry !== "Netherlands" &&
        prevLength !== currLength &&
        scrollPercentage === 100 && (
          <div className="flex flex-row justify-center items-end">
            <h1 className="text-black font-bold text-center py-2">Loading</h1>
            <marquee
              style={{
                width: 25,
                marginBottom: 3,
              }}
            >
              ....
            </marquee>
          </div>
        )}
      {currCountry === "Netherlands" &&
        dataList !== [] &&
        prevLength !== currLength && (
          <div
            onClick={() => {
              setPageIncrement(pageIncrement + 20);
            }}
            className={`bg-[#F75454] text-white text-xs py-2 px-3 rounded-md cursor-pointer w-fit text-center m-auto my-4`}
          >
            {"read more".replace(/ /g, "\u00A0")}
          </div>
        )}
    </div>
  );
}

export async function getStaticProps() {
  let data = await axios.get(
    `https://uninterested-suit-tuna.cyclic.app/getdata/${page}`
  );
  return {
    props: {
      data: data?.data,
    },
  };
}
