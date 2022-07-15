import React ,{useState , useRef, useCallback , useEffect } from 'react';
import { useSelector } from 'react-redux'
import { selectIsAuth} from '../../redux/slices/auth'
import { Navigate , useNavigate  , useParams} from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

import axios from '../../axios'


export const AddPost = () => {

  const {id : paramsID} = useParams();
  let navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [imageUrl, setImageUrl] = useState('');
  const isAuth = useSelector(selectIsAuth);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const inputImageRef = useRef(null);


  const baseURL = "http://localhost:3030";
  const defaultImage = 'https://cdn.pellerex.com/public/ecosystem/web/content/identity/react-identity-check/react-redux.png';


  const handleChangeFile = async(event) => {

    try{
      const formData = new FormData() ;
      const file =  event.target.files[0] ;
      formData.append('image' , file ) ;
      const {data} = await axios.post('/upload' , formData) ;
      setImageUrl(data.url)
      console.log(data);

    }catch(error){
      alert('file uploading error')
      console.warn(error);

    }
  };

  const onClickRemoveImage = () => {

    if(window.confirm('You wont to remove image ?')){
      setImageUrl('');
    }
  };

  const onChange = useCallback((value) => {
    setText(value);
  }, []);



  const onSubmit = async () => {

      try {
        setIsLoading(true) ;

        const newPost = {
          title ,
          text ,
          tags ,
          imageUrl 
        }

        const {data} = isEditing ?
        await axios.put(`/posts/${paramsID}` , newPost) :
        await axios.post('/posts' , newPost) ;


         const _id = isEditing ? paramsID : data._id
         navigate(`/posts/${_id}`);
        
      } catch (error) {
        alert('post creation error')
        console.warn(error);
      }
  } 

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Enter Text...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  useEffect(() => {
    
    if(paramsID){

      setIsEditing(true)
      axios.get(`posts/${paramsID}`).then(res => {
        const {tags, title, text ,imageUrl } = res.data ;
        setText(text);
        setTags(tags);
        setTitle(title);
        setImageUrl( imageUrl );
        
      })
    }
    }, [])
    

  if(!isAuth){
    return <Navigate to="/" />
  }
  


  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large"  onClick={()=> inputImageRef.current.click()} > 
        Load Image
      </Button>
      <input type="file" onChange={handleChangeFile} hidden  ref={inputImageRef} />
      {imageUrl && ( <>   
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Delete
        </Button>
        <img className={styles.image} src={imageUrl ? baseURL+imageUrl : defaultImage } alt="Uploaded" />
      </>)}

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Post Title..."
        value ={title} 
        onChange={(e)=> setTitle(e.target.value)}
        fullWidth
      />
      <TextField classes={{ root: styles.tags }} variant="standard" placeholder="tags"
       value ={tags} 
       onChange={(e)=> setTags(e.target.value)}
       fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button size="large" variant="contained" onClick={onSubmit}>
          {isEditing ? 'Update' :  'Publish' }
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
