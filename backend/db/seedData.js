const { db } =require('./index.js')


db.none("INSERT INTO users(username) VALUES('jonie'), ('dianaPursuit'), ('dnorris'), ('nikkiVee'), ('AliG'), ('coreyPursuit'), ('gabby836'), ('simsimmah'), ('nadiaEva'), ('kimE')").then(() => {

db.none("INSERT INTO genres(genre_name) VALUES('rock'), ('metal'), ('indie-rock'), ('lofi'), ('pop')").then(()=> {


db.none("INSERT INTO songs(title, img_url, user_id, genre_id) VALUES('long gone', 'https://cdn.filestackcontent.com/8xfvog0PQ1vs5twYrXWo/convert?cache=true&crop=0%2C0%2C1920%2C960', 1, 1), ('One', 'https://i.pinimg.com/originals/58/22/24/5822249280bb1a8635fc4faf16ae60b3.jpg', 3, 2 ), ('Destroyer', 'https://i.scdn.co/image/08671914203c6bee0a01b8feeccae7b0bfe22140', 2, 3), ('Let''s go outside', 'https://m.media-amazon.com/images/I/719Da3-OC5L._SS500_.jpg', 2,3), ('Summer','https://www.billboard.com/files/media/calvin-harris-performance-smile-2014-billboard-1548.jpg', 4, 5), ('all star', 'https://s3.amazonaws.com/rapgenius/smash%20mouth%20-%20i-m%20a%20believer.jpg', 5, 5), ('Johnny B. Goode', 'https://i.pinimg.com/originals/ff/a3/61/ffa3613567208bb82d4f83904c880be4.jpg', 6, 1), ('What You Won''t Do for Love', 'https://images-na.ssl-images-amazon.com/images/I/31M6GEK9BZL.jpg', 8, 5), ('American Jesus', 'https://static.stereogum.com/uploads/2013/06/Bad-Religion-Recipe-For-Hate-640x640.jpg', 7, 1), ('Come and get your love', 'https://farm8.staticflickr.com/7345/11629823153_09a858c61e_b.jpg', 9, 1), ('Slow dancing in the dark', 'https://i.ytimg.com/vi/pjz6tHzV5SE/maxresdefault.jpg', 10, 5), ('Y.M.C.A', 'https://m.media-amazon.com/images/I/81myiqu1FkL._SS500_.jpg', 3, 5), ('Artillery', 'https://images-na.ssl-images-amazon.com/images/I/91rfO1K8slL._SL1500_.jpg', 1, 2), ('No cars go', 'https://www.billboard.com/files/media/arcade-fire-portrait-throwback-billboard-1548.jpg', 2, 3), ('Plastic Love', 'https://i.kym-cdn.com/photos/images/original/001/334/161/8b8.jpg', 1, 4), ('technicolor', 'https://img1.wsimg.com/isteam/ip/87d54cd3-d243-4e55-97ae-60ae3f405560/777011f8-f6f9-4ee5-8c05-076437a844ca.jpg/:/rs=w:1280', 5, 4), ('Aruarian dance', 'https://djbooth.net/.image/t_share/MTUzNDg1OTU0NDM4MjEwNzU4/nujabes-japanese-animejpg.jpg', 3, 4), ('Combat Mosh', 'https://f4.bcbits.com/img/a0558955748_10.jpg', 3, 2)").then(()=> {


    })
  })
})
