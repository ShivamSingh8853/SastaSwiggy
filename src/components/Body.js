import RestaurantCard from "./RestaurantCard";
//import resobj from "../utils/mockData";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
const Body = () => {
    const [listofRestaurants,setListofRestaurant]=useState([]);
    const [filteredRestaurant,setFilteredRestaurant]=useState([]);
    const [searchText,setSearchText]=useState("");
    useEffect(()=>{
          fetchdata();
    },[]);
    const fetchdata=async () => {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.80060&lng=86.42830&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json= await data.json();
      console.log(json);
      setListofRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };
    return(
      <div className="body">
        <div className='filter'>
          <div className="search">
            <input type="text" className="search-box" value={searchText} onChange={(e) =>{
                setSearchText(e.target.value);
            }}/>
            <button
                  onClick={() =>{
                    const filteredRestaurant=listofRestaurants.filter(
                      (res) => res.data.name.toLowerCase().includes(searchText.toLowerCase())
                    );
                    setFilteredRestaurant(filteredRestaurant);
                  }}
            >Search</button>
          </div>
            <button className="filter-btn" onClick={() =>{
                const filteredList = listofRestaurants.filter(
                    (res) => res.data.avgRating>4 
                );
                setFilteredRestaurant(filteredList);
            }}>Top Rated Restaurant</button>
        </div>
        <div className="res-container">
        {  (filteredRestaurant || []).map((restaurant) => (
         <Link key={restaurant.info.id} to={"/restaurants/"+restaurant.data.id}> <RestaurantCard  resData={restaurant} /></Link>
        ))}
      </div>
      </div>
    );
  };

  export default Body;