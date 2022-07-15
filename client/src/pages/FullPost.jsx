import React , {useState , useEffect}from "react";
import {useParams} from 'react-router-dom'

import axios from "../axios";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {

  const [data , setData] = useState();
  const [author , setAuthor] = useState();

  const [isLoading , setIsLoading] = useState(true);
  const {id} = useParams();


  const defaultImage = 'https://cdn.pellerex.com/public/ecosystem/web/content/identity/react-identity-check/react-redux.png';
  const baseURL = "http://localhost:3030";

  useEffect(() => {
    getData();
  }, [isLoading]) ;


  const getData  = async()=> {
    try {
      const posts =  await axios.get(`/posts/${id}`) ;
      const {user} = posts.data 
      const author =  await axios.get(`/users/${user}`) ;
      setData(posts.data);
      setAuthor(author.data) ;
      setIsLoading(false) ;
    } catch (error) {
      alert('data fetch error')

    }
  }


  if(isLoading){
    return <Post  isLoading={isLoading} isFullPost />
  }
  else {

    console.log(author);
    console.log(data);

  
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
              imageUrl ={ data.imageUrl ? baseURL+data.imageUrl : defaultImage }
        user={{
          avatarUrl : author.avatarUrl ,
                    fullName: author.fullName
        }}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={[...data.tags]}
        isFullPost
      >
        <p>
          {data.text}
        </p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );

}

};
