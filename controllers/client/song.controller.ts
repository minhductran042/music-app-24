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
    })

    const songs = await Song.find({
        topicId: topic.id,
        deleted: false,
        status: "active"
    }).select("title avatar singerId like slug");

    for(const item of  songs) {
        const singerInfo = await Singer.findOne({
            _id: item.singerId
        }).select("fullName");

        item["singerFullName"] = singerInfo["fullName"];
    }

    // console.log(songs);

    res.render("client/pages/songs/list",{
        pageTitle: "Danh sách bài hát",
        songs: songs
    });
};