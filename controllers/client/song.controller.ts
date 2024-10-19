import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// [GET] /:slugTopic
export const list = async (req: Request, res: Response) => {

    const slugTopic: string = req.params.slugTopic;

    const topic = await Topic.findOne({
        slug: slugTopic,
        deleted: false,
        status: "active"
    });


    const songs = await Song.find({
        topicId: topic.id,
        deleted: false,
        status: "active"
    }).select("title avatar singerId like slug");


    for (const item of songs) {
        const singerInfo = await Singer.findOne({
            _id: item.singerId
        }).select("fullName");
        
        item["singerFullName"] = singerInfo["fullName"];
    }
    res.render("client/pages/songs/list", {
        pageTitle: topic.title,
        songs: songs
    });
};


// [GET] /detail/:slugSong
export const detail = async (req: Request, res: Response) => {

    const slugSong = req.params.slugSong;
    
    const song = await Song.findOne({
        slug: slugSong,
        deleted: false,
        status: "active"
    });

    const singer = await Singer.find({
        _id: song.singerId
    }).select("fullName");

    // console.log(singer);

    const topic = await Topic.find({
        _id: song.topicId
    }).select("title");

    // console.log(topic);

    res.render("client/pages/songs/detail", {
        pageTitle: "Chi tiết bài hát",
        song: song,
        topic: topic,
        singer: singer
    })
};

// [GET] /like
export const like = async (req: Request, res: Response) => {

    try {
        const { id, type } = req.body;
        const song = await Song.findOne({
            _id: id,
            status: "active",
            deleted: false
        })


        let updateLike = song.like;

        if(type == "like") {
            updateLike = updateLike + 1;
        } else if(type == "dislike") {
            updateLike = updateLike - 1;
        }

        await Song.updateOne({
            _id: id,
            status: "active",
            deleted: false
        }, {
            like: updateLike
        });

        
        res.json({
            code: 200,
            updateLike: updateLike,
            message: "Cập nhật thành công!"
        });

    } catch(error) {

        res.json({
            code:400,
            message: "Id gửi bị sai" 
        })

    }
    
    
    
};