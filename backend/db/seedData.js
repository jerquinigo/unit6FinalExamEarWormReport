const { db } =require('./index.js')


db.none("INSERT INTO users(username) VALUES('jonie'), ('dianaPursuit'), ('dnorris'), ('nikkiVee'), ('AliG'), ('coreyPursuit'), ('gabby836'), ('simsimmah'), ('nadiaEva'), ('kimE')")

db.none("INSERT INTO genres(genre_name) VALUES('rock'), ('metal'), ('indie'), ('lofi'), ('pop')").then(()=> {


db.none("INSERT INTO songs(title, img_url, user_id, genre_id) VALUES('long gone', 'https://cdn.filestackcontent.com/8xfvog0PQ1vs5twYrXWo/convert?cache=true&crop=0%2C0%2C1920%2C960', 1, 1), ('One', 'https://i.pinimg.com/originals/58/22/24/5822249280bb1a8635fc4faf16ae60b3.jpg', 3, 2 ), ('Destroyer', 'https://i.scdn.co/image/08671914203c6bee0a01b8feeccae7b0bfe22140', 2, 3), ('Let''s go outside', 'https://m.media-amazon.com/images/I/719Da3-OC5L._SS500_.jpg', 2,3), ('Summer','https://www.billboard.com/files/media/calvin-harris-performance-smile-2014-billboard-1548.jpg', 4, 5), ('all star', 'https://s3.amazonaws.com/rapgenius/smash%20mouth%20-%20i-m%20a%20believer.jpg', 5, 5), ('Johnny B. Goode', 'https://i.pinimg.com/originals/ff/a3/61/ffa3613567208bb82d4f83904c880be4.jpg', 6, 1), ('What You Won''t Do for Love', 'https://images-na.ssl-images-amazon.com/images/I/31M6GEK9BZL.jpg', 8, 5), ('American Jesus', 'https://static.stereogum.com/uploads/2013/06/Bad-Religion-Recipe-For-Hate-640x640.jpg', 7, 1), ('Come and get your love', 'https://farm8.staticflickr.com/7345/11629823153_09a858c61e_b.jpg', 9, 1), ('Slow dancing in the dark', 'https://i.ytimg.com/vi/pjz6tHzV5SE/maxresdefault.jpg', 10, 5), ('Y.M.C.A', 'https://m.media-amazon.com/images/I/81myiqu1FkL._SS500_.jpg', 3, 5), ('Artillery', 'https://images-na.ssl-images-amazon.com/images/I/91rfO1K8slL._SL1500_.jpg', 1, 2), ('No cars go', 'https://www.billboard.com/files/media/arcade-fire-portrait-throwback-billboard-1548.jpg', 2, 3), ('Plastic Love', 'https://i.kym-cdn.com/photos/images/original/001/334/161/8b8.jpg', 1, 4), ('technicolor', 'https://img1.wsimg.com/isteam/ip/87d54cd3-d243-4e55-97ae-60ae3f405560/777011f8-f6f9-4ee5-8c05-076437a844ca.jpg/:/rs=w:1280', 5, 4), ('Aruarian dance', 'https://djbooth.net/.image/t_share/MTUzNDg1OTU0NDM4MjEwNzU4/nujabes-japanese-animejpg.jpg', 3, 4), ('Combat Mosh', 'https://f4.bcbits.com/img/a0558955748_10.jpg', 3, 2)").then(() => {


db.none("INSERT INTO favorites(user_id, song_id) VALUES(1,1), (1,2), (1,4), (1,6), (1,7), (1,8), (1,9), (1,11), (1,12), (1,14), (1,15), (1,17), (2,1), (2,4), (2,8), (2,10), (2,11), (2,15), (2,17), (3,2), (3,9), (3,12), (3,13), (3,17), (4,1), (4,6), (4,9), (4,18), (5,1), (5, 8), (5,9), (5,12), (5,16), (6,7), (7,6), (7,14), (8,5), (8,6), (9,1), (9,18), (10, 4), (10, 8), (10,12), (1,3)").then(()=> {

db.none("INSERT INTO comments(comment_body, user_id, song_id) VALUES('one of my favorite song to listen to while commuting', 1, 1), ('favorite metallica song', 1,2), ('randomly discovered this song from recommendations', 1, 4), ('i like how this song became a living meme',1,6), ('first time i heard this song was in the back to the future movie', 1,7), ('favorite bad religion song', 1,9), ('love joji''s music', 1,11), ('such a chill song', 2,1),('love this song', 2,4), ('good japanese disco song',2,15), ('metallica was one of my first metal bands i listened to',3,2), ('love the punk rock band', 3,9), ('love the vibes this song gives off', 3,17), ('great song', 4,1), ('i loved the movie shreck because of this song', 4,6), ('checked this song out because of jonie', 5,1), ('i play this song at least once a week', 5,8), ('jonie and dnorris always jam out to this song', 5,12), ('chill vibes', 5,16), ('go johnny go', 6,7)").then(()=> {

        })
      })
    })
  })
  .catch(err => {
    console.log(err)
  })
