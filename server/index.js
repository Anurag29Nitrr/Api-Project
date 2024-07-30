const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// MongoDB connection string
const db = "mongodb://127.0.0.1:27017/Project";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.set("strictQuery", true);
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

const postSchema = new mongoose.Schema({
    name: { type: String },
    story: { type: String, required: true },
    supports: { type: Number, default: 0 }
});

const Post = mongoose.model("Post", postSchema);

app.post('/newPost', (req, res) => {
    const { name, story } = req.body;

    const newPost = new Post({ name, story, supports: 0 });

    newPost.save()
        .then(() => {
            console.log("Post saved");
            res.status(200).json({ message: "Post added successfully" });
        })
        .catch((err) => {
            console.error("Error saving post:", err);
            res.status(400).json({ error: "Post not added" });
        });
});


app.put('/supportPost', async (req, res) => {
    const postId = req.query.id;

    if (!postId) {
        return res.status(400).json({ error: 'Missing id parameter' });
    }

    try {
        const postToUpdate = await Post.findById(postId);

        if (!postToUpdate) {
            return res.status(404).json({ error: 'Post not found' });
        }

        postToUpdate.supports += 1;

        await postToUpdate.save();

        return res.status(200).json({ message: 'Support added successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.put('/notSupportPost', async (req, res) => {
//     const postId = req.query.id;

//     console.log("Not support")

//     try {
//         const postToUpdate = await post.findById(postId);

//         if (!postToUpdate) {
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         if(postToUpdate.supports > 0)
//             postToUpdate.supports -= 1;

//         await postToUpdate.save();

//         return res.status(200).json({ message: 'Support added successfully' });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

app.put('/notSupportPost', async (req, res) => {
    const postId = req.query.id;

    try {
        const postToUpdate = await Post.findById(postId);

        if (!postToUpdate) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (postToUpdate.supports > 0) {
            postToUpdate.supports -= 1;
        }

        await postToUpdate.save();

        return res.status(200).json({ message: 'Support removed successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/allPosts', async (req, res) => {
    try {
        let posts = await Post.find({});
        res.status(200).json(posts);
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/post', async (req, res) => {
    const postId = req.query.id;

    try {
        const foundPost = await Post.findById(postId);

        if (!foundPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        return res.status(200).json(foundPost);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

const contactSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    subject: { type: String },
    message: { type: String },
});

const Contact = mongoose.model("Contact", contactSchema);

app.post('/newContact', (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    const newContact = new Contact({ name, email, phone, subject, message });

    newContact.save()
        .then(() => {
            console.log("Contact saved");
            res.status(200).json({ message: "Contacted successfully" });
        })
        .catch((err) => {
            console.error("Error saving contact:", err);
            res.status(400).json({ error: "Not contacted" });
        });
});

// Endpoint to fetch all contacts
app.get('/allContacts', async (req, res) => {
    try {
        let contacts = await Contact.find({});
        res.status(200).json(contacts);
    } catch (err) {
        console.error("Error fetching contacts:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// SERVER STARTED
app.listen(port, () => {
    console.log(`Listening at port: ${port}`);
});
