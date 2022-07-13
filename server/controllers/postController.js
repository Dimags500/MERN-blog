import { Post } from "../models/Post.js";
import { User } from "../models/User.js";

const createPost = async (req, res) => {
  try {
    const doc = new Post({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "cant create new post ",
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user").exec();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "cant get posts ",
    });
  }
};

const updatePostById = async (req, res) => {
  const { id: postId } = req.params;
  try {
    let post = await Post.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "cant update post ",
    });
  }
};

const getPostById = async (req, res) => {
  const { id: postId } = req.params;
  try {
    Post.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      },

      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: "cant return post ",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "post not found",
          });
        }

        res.json(doc);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "cant get posts ",
    });
  }
};

const deletePostById = async (req, res) => {
  const { id: postId } = req.params;
  try {
    Post.findByIdAndDelete({ _id: postId }, (error, doc) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          message: "cant delete post ",
        });
      }

      if (!doc) {
        return res.status(404).json({
          message: "post not found",
        });
      }

      res.json({ success: true });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "cant delete posts ",
    });
  }
};

const getLastTags = async (req, res) => {
  try {
    const posts = await Post.find().limit(5).populate("user").exec();

    const tages = posts
      .map((item) => item.tags)
      .flat()
      .slice(0, 5);
    res.json(tages);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "cant get tages ",
    });
  }
};

export {
  createPost,
  getAllPosts,
  getPostById,
  deletePostById,
  updatePostById,
  getLastTags,
};
