import React from "react";

const VideoCard = ({ info }) => {
  console.log(info);
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div className="p-2 m-2 w-72 shadow-lg cursor-pointer">
      <img className="rounded-lg" alt="thumbnail" src={thumbnails.medium.url} />
      <ul>
        <li className="font-bold py-2">{title}</li>
        <li>{channelTitle}</li>
        <li>{statistics?.viewCount} views</li>
      </ul>
    </div>
  );
};

//&There is a function,which takes this VideoCard Component and just returns this <VideoCard /> component once again.This function is basically called as the Higher Order Function or a Higher Order Component.

//~What is the use of the Higher Order Component,Why would I need it?Suppose you want to do the small modification on the top of your Video Card.Suppose I also need a VideoCard with a border.What I will do is I will wrap this returned VideoCard around the div.



export default VideoCard;
