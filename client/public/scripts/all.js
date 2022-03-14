
/**
 * Here we initialize our inportant variables
 * Here the dom element already exist
 */
let new_update_clicked = 0;
const newUpdate = document.getElementById("homepage_update");
const exitorenter = document.getElementById("homepage_update_exit_button");
let post_information = "";
let current_posts = [];

/**
 * This function removes the dom elements created when we are 
 * in positing mode
 */
function removeSymbolesFromPost() {
    const newUpdateTextbox = document.getElementById("homepage_update_textbox");
    const imageorPostWrapper = document.getElementById("homepage_imageorPost_wrapper");
    const addImage = document.getElementById("homepage_addImage");
    const postupdate = document.getElementById("homepage_postupdate");
    newUpdateTextbox.remove();
    addImage.remove();
    postupdate.remove();
    imageorPostWrapper.remove(); 
}

/**
 * This function takes us to posting mode. 
 * It creates the textarea to write, and the button to post.
 * As well as the option to include an image.
 */
function addSymbolesToPost() {
    const newUpdateTextbox = document.createElement("textarea");
    newUpdateTextbox.innerText = "Give your update ... ";
    newUpdateTextbox.id = "homepage_update_textbox";
    
    const imageorPostWrapper = document.createElement("div");
    imageorPostWrapper.id = "homepage_imageorPost_wrapper";
    
    const addImage = document.createElement("a");
    addImage.id = "homepage_addImage";
    
    const postupdate = document.createElement("button");
    postupdate.id = "homepage_postupdate";
    postupdate.innerHTML = "Update";
    
    newUpdate.appendChild(newUpdateTextbox);
    newUpdate.appendChild(imageorPostWrapper);
    imageorPostWrapper.appendChild(addImage);
    imageorPostWrapper.appendChild(postupdate);
}

/**
 * This Function is what gives the posting button its event listener 
 */
function addFunctonalityOfPostButton() {
    const post = document.getElementById("homepage_postupdate");
    post.addEventListener("click", post_update);
};

/**
 * This Function is what passes the information in the textbox, if the textbox has information, 
 * to the backend server. Using Axios.
 */
function post_update() {
    const textarea = document.getElementById("homepage_update_textbox");
    const value = textarea.value;
    if (value.length > 0) {
        post_information = value;
        textarea.value = '';
        console.log(post_information);
        axios.post("http://localhost:3001/api/insert", {
            newUpdate: post_information
        }).then(()=> {
            alert("Successful Insert!");
        });
    }
};

/**
 * This function allows for the new elements to apear and disappear 
 * when 'create new update button' is pressed.
 */
exitorenter.addEventListener("click", exit);
function exit() {
    if (!new_update_clicked) {
        newUpdate.style["height"] = "350px";
        newUpdate.style["borderRadius"] = "25px";
        new_update_clicked = 1;
        addSymbolesToPost();
        addFunctonalityOfPostButton();
    } else {
        newUpdate.style.height = "50px";
        newUpdate.style.borderRadius = "40px";
        new_update_clicked = 0;   
        removeSymbolesFromPost();     
    }
};

/**
 * This function makes a box for each post posted.
 */
function makePostBoxes() {
    const homepage_updates_wrapper = document.getElementById("homepage_updates_wrapper");
    for (let i = 0; i < current_posts.length; i++) {
        const new_update_box = document.createElement("div");
        new_update_box.className = "updates";
        const writing = document.createElement("p");
        writing.innerText = current_posts[i];
        new_update_box.appendChild(writing);
        homepage_updates_wrapper.appendChild(new_update_box);
    }
}

/**
 * This axios function is what gets all of our data from our backend.
 * Which our backend got from the database
 */
axios.get("http://localhost:3001/api/get").then((response) => {
    data = response.data;
    for (let i = 0; i < data.length; i++) {
        current_posts.push(data[i]['post']);
    }
    makePostBoxes();
});
