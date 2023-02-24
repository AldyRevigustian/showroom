import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card } from "reactstrap";
import { FARM, SEND_GIFT } from "utils/api/api";
import Loading from "./Loading";
import shot from '../assets/audio/shot.mp3';
import combo from '../assets/audio/combo.mp3';

function StarButton({ roomId, cookiesLoginId, theme, csrfToken }) {
  const [stars, setStars] = useState([
    {
      gift_id: "",
      name: "a",
      count: 0,
      url: "https://static.showroom-live.com/image/gift/1_s.png?v=1",
    },
    {
      gift_id: "",
      name: "b",
      count: 0,
      url: "https://static.showroom-live.com/image/gift/1001_s.png?v=1",
    },
    {
      gift_id: "",
      name: "c",
      count: 0,
      url: "https://static.showroom-live.com/image/gift/1002_s.png?v=1",
    },
    {
      gift_id: "",
      name: "d",
      count: 0,
      url: "https://static.showroom-live.com/image/gift/1003_s.png?v=1",
    },
    {
      gift_id: "",
      name: "e",
      count: 0,
      url: "https://static.showroom-live.com/image/gift/2_s.png?v=1",
    },
  ]);
  const [starLoading, setStarLoading] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [disableCount, setDisableCount] = useState(false);
  const [clickCount, setClickCount] = useState({
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
  });

  useEffect(() => {
    getFirstStar();
  }, [roomId, cookiesLoginId]);

  const getFirstStar = async () => {
    setStarLoading(true);
    const response = await axios.post(FARM, {
      cookies_login_id: cookiesLoginId,
      room_id: roomId,
    });

    const data = response.data;
    if (!data.message.includes("Offline")) {
      setAllStar(data);
      return;
    }
    if (data.message.includes("Sukses")) {
      toast.info(`You got free star`, {
        theme: "colored",
      });
    }
    setStarLoading(false);
  };

  const sendStar = async (e) => {
    console.log(e.target.name);
    console.log(clickCount[e.target.name] + 1);

    const response = await axios.post(SEND_GIFT, {
      cookies_id: cookiesLoginId,
      csrf_token: csrfToken,
      room_id: roomId,
      gift_name: e.target.name,
      num: clickCount[e.target.name] + 1,
    });

    const data = response.data;
    console.log(data);
  };

  // useEffect(() => {

  // }, [stars, isCounting]);

  const disable = () => {
    setDisableCount(true)

    let timeoutDisable;
    timeoutDisable = setTimeout(() => {
      setDisableCount(false);
    }, 3000);

    return () => clearTimeout(timeoutDisable);
  }

  const setAllStar = (data) => {
    setStarLoading(true);
    if (data.star.length === 0) return;
    const updatedStar = stars.map((gift, index) => {
      return {
        ...gift,
        gift_id: data.star[index].gift_id,
        count: data.star[index].free_num,
      };
    });
    setStars(updatedStar);
    setStarLoading(false);
  };

  const handleClick = (e) => {
    setIsCounting(true);

    setStars((prevState) => {
      return prevState.map((starObj) => {
        if (starObj.name === e.target.name) {
          if (starObj.count > 0) {
            setClickCount({
              ...clickCount, [e.target.name]: clickCount[e.target.name] + 1
            })

            if (clickCount[e.target.name] == 9) {
              sendStar(e);
              disable()
              setClickCount({
                ...clickCount, [e.target.name]: 0
              })
            }

            if (clickCount[e.target.name] == 9) {
              const audio = new Audio(combo);
              audio.volume = 1;
              audio.play();
            } else {
              const audio = new Audio(shot);
              audio.volume = 1;
              audio.play();
            }

            return {
              ...starObj,
              count: starObj.count - 1,
            };

          }
        }
        return starObj;
      });
    });
  };

  return (
    <Card
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "inherit",
        padding: "20px",
        backgroundColor: theme === "dark" ? "#343A40" : "white",
        borderRadius: "10px"
      }}
      className="my-4"
    >
      {stars.map((gift) => (
        <div className="d-flex flex-column align-items-center px-1 my-0 mx-3">
          <input
            type="image"
            src={
              gift.gift_id
                ? `https://static.showroom-live.com/image/gift/${gift.gift_id}_s.png?v=1`
                : gift.url
            }
            width="50px"
            height="50px"
            style={{ cursor: "pointer" }}
            onClick={disableCount ? void (0) : handleClick}
            name={gift.name}
            alt="stars"
          />
          <b className="mb-0">
            {starLoading ? (
              <Loading color={theme === "dark" ? "white" : "black"} size={6} />
            ) : (
              gift.count
            )}
          </b>
        </div>
      ))}
    </Card>
  );
}

export default StarButton;
