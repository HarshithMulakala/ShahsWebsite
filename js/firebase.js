var firebaseConfig = {
    apiKey: "AIzaSyBvSni2okr7s7QdUCAfWux6UQUSiJ5bMCc",
    authDomain: "cashonomics-web.firebaseapp.com",
    projectId: "cashonomics-web",
    storageBucket: "cashonomics-web.appspot.com",
    messagingSenderId: "1091594377918",
    appId: "1:1091594377918:web:66ef98f8011684f7aedcef"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

var ui = new firebaseui.auth.AuthUI(firebase.auth());

let key = false;

if (window.location.pathname == "/editor.html" || window.location.pathname == "/editor") {
    const body = document.querySelector('.editorybody');
    body.innerHTML = `<h1>Cashonomics Login!</h1>
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>`;
    ui.start('#firebaseui-auth-container', {
        signInOptions: [
            // List of OAuth providers supported.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        // Other config options...
    });
    console.log(firebase.auth().currentUser);
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            body.innerHTML = `<button class="btn logout-btn">Logout</button>
            <button class="btn continue-btn">Continue</button>`;

            const continuebtn = document.querySelector('.continue-btn');
            const logoutbtn = document.querySelector('.logout-btn');
            logoutbtn.addEventListener('click', () => {
                firebase.auth().signOut()
                window.location = 'editor.html';
            });
            continuebtn.addEventListener('click', () => {
                if (user.uid == 'AponcxaV5aPJyOCZ4CCTruQktbU2' || user.uid == 'zblS4hFQSgXi5stGfS2eNP3z5Pp1') {
                    console.log(firebase.auth().currentUser);
                    const body = document.querySelector('.editorybody');
                    body.innerHTML = `<div class="banner">
        <input type="file" accept="image/*" id="banner-upload" hidden>
        <label for="banner-upload" class="banner-upload-btn"><img src="images/upload.png" alt="upload banner"></label>
    </div>

    <div class="blog">
        <textarea type="text" class="title" placeholder="Your Blog Title"></textarea>
        <textarea type="text" class="article" placeholder="Your Blog Content"></textarea>
    </div>

    <div class="blog-options">
        <button class="btn publish-btn">Publish</button>
        <input type="file" accept="image/*" id="image-upload" hidden>
        <label for="image-upload" class="btn grey upload-btn">Upload Image</label>

    </div>`;

                    const blogTitleField = document.querySelector('.title');
                    const articleField = document.querySelector('.article');

                    const bannerImage = document.querySelector('#banner-upload');
                    const banner = document.querySelector('.banner');
                    let bannerPath;

                    const code = document.querySelector('.code-input');

                    const publishBtn = document.querySelector('.publish-btn');
                    const uploadInput = document.querySelector('#image-upload');

                    bannerImage.addEventListener('change', () => {
                        uploadImage(bannerImage, 'banner');
                    });

                    uploadInput.addEventListener('change', () => {
                        uploadImage(uploadInput, 'image');
                    });

                    const uploadImage = (uploadFile, uploadType) => {
                        const [file] = uploadFile.files;
                        if (file && file.type.includes("image")) {
                            const formdata = new FormData();
                            formdata.append("image", file);

                            fetch('/upload', {
                                method: 'post',
                                body: formdata
                            }).then(res => res.json())
                                .then(data => {
                                    if (uploadType === 'image') {
                                        addImage(data, file.name);
                                    } else {
                                        bannerPath = `${location.origin}/${data}`;
                                        banner.style.backgroundImage = `url(${bannerPath})`;
                                    }

                                })
                        }
                        else {
                            alert('Please upload an image file');
                        }
                    }

                    const addImage = (imagepath, alt) => {
                        let curPos = articleField.selectionStart;
                        let textToInsert = `\r![${alt}](${imagepath})\r`;
                        articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
                    }

                    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                    let keyValue = false;



                    publishBtn.addEventListener('click', () => {
                        if (articleField.value.length && blogTitleField.value.length) {
                            let letters = 'abcdefghijklmnopqrstuvwxyz';
                            let blogTitle = blogTitleField.value.split("").join("-");
                            let id = '';
                            for (let i = 0; i < 10; i++) {
                                id += letters[Math.floor(Math.random() * letters.length)];
                            }
                            let docName = `${blogTitle}-${id}`;
                            let date = new Date();


                            db.collection('blogs').doc(docName).set({
                                title: blogTitleField.value,
                                article: articleField.value,
                                bannerImage: bannerPath,
                                publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
                            }).then(() => {
                                location.href = `/${docName}`;
                            }).catch((err) => {
                                console.log(err);
                            })
                        }
                    });
                }
                else {
                    window.location = 'home.html';
                    alert("You are not permitted to access this page!");
                }
            });

        } else {
            // User is signed out
            // ...
        }
    });

}


