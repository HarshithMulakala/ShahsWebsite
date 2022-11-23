const blogSection = document.querySelector('.blog-section');

db.collection('blogs').get().then((blogs) => {
    blogs.forEach(blog => {
        if (blog.id != decodeURI(location.pathname.split("/").pop())) {
            createBlog(blog);
        }
    })
});

const createBlog = (blog) => {
    let data = blog.data();
    let article = data.article.substring(0, 200);
    console.log(article);
    article = article.split(" ");
    console.log(article);
    let newArticle = "";

    for (let i = 0; i < article.length; i++) {
        if (i != 0) {
            newArticle += " ";
        }
        if (article[i].indexOf("uploads/") != -1) {
            newArticle += article[i].substring(0, article[i].indexOf("![")) + "[image]" + article[i].substring(article[i].lastIndexOf(")\n") + 1, article[i].length);
        }
        else {
            newArticle += article[i];
        }
    }

    blogSection.innerHTML += `<div class="blog-card">
    <img src="${data.bannerImage}" class="blog-image" alt="">
    <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
    <p class="blog-overview">${newArticle + '...'
        }</p>
    <a href="/${blog.id}" class="btn dark">Read More!</a>
</div > `;
}