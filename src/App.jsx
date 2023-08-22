import "./global.css";
import { useEffect } from "react";
import { useState } from "react";
import s from "./style.module.css";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowAPI } from "./api/tv-show";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import logo from "./assets/images/logo.png";
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";

console.log(process.env.REACT_APP_API_KEY_PARAM);

export function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommendationList, setRecommendationList] = useState([]);

  async function fetchPopulars() {
    try {
      const populars = await TVShowAPI.fetchPopulars();

      if (populars.length > 0) {
        setCurrentTVShow(populars[0]);
      }
    } catch (error) {
      alert(
        "We couldn't reach the server to get the most popular TV show :" +
          error.message
      );
    }
  }
  async function fetchRecommendations(tvShowId) {
    try {
      const recommendations = await TVShowAPI.fetchRecommendations(tvShowId);

      if (recommendations.length > 0) {
        setRecommendationList(recommendations.slice(0, 10));
      }
    } catch (error) {
      alert(
        "We couldn't reach the server to get the recommendations :" +
          error.message
      );
    }
  }

  async function searchTVShow(TVShowName) {
    const searchResponse = await TVShowAPI.fetchByTitle(TVShowName);
    if (searchResponse.length > 0) {
      try {
        setCurrentTVShow(searchResponse[0]);
      } catch (error) {
        alert(
          "We couldn't reach the server to get the series you are looking for :" +
            error.message
        );
      }
    }
  }

  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow]);

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : `black`,
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo
              image={logo}
              title={"Cyriz"}
              subtitle={"My personal series advisor"}
            />
          </div>
          <div className="col-sm-12 col-md-4">
            <SearchBar onSubmit={searchTVShow} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommendations}>
        {recommendationList && recommendationList.length > 0 && (
          <TVShowList
            tvShowList={recommendationList}
            onClickItem={setCurrentTVShow}
          />
        )}
      </div>
    </div>
  );
}
