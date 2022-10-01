let section = document.querySelector("section");

let member_containers = document.querySelectorAll(".member-container");
let bigger_member_container = document.querySelector("#bigger-width-container");

let unanchored_member_controls = document.querySelectorAll(".unanchored-members .member-control");
let anchored_member_control = document.querySelectorAll(".anchored-member .member-control");

let unanchored_members = document.querySelector(".unanchored-members");
let anchored_member = document.querySelectorAll(".anchored-member");

const pin = document.querySelector("#pin");
const anchored_mute_icon = document.querySelector(".anchored-member span");

function cloning_mute_icon() {
    const mute_icon_container = document.querySelector(".mute-icon-container").cloneNode(true);
    return mute_icon_container
}

function equalize_all_members() {
    bigger_member_container.removeAttribute('id');
}
equalize_all_members() ;

function make_remove_button_container() {
    const remove_button_container = document.createElement("div");
    remove_button_container.className = "remove-button-container";
    remove_button_container.style.transform = "translate(50%, 50%)";
    remove_button_container.style.width = "24px";
    remove_button_container.style.height = "24px";

    const remove_button = document.createElement("span");
    remove_button.className = "remove-button material-icons-outlined";

    const remove_button_text = document.createTextNode("cancel");

    remove_button.appendChild(remove_button_text);
    remove_button.style["user-select"] = "none";
    remove_button_container.appendChild(remove_button);

    remove_button_container.style.position = "absolute";
    remove_button_container.style.cursor = "pointer";
    
    
    remove_button_container.onclick = remove_member;
    function remove_member() {
        equalize_all_members()
        if (this.parentNode === anchored_member[0]) unanchoring();
        this.parentNode.style.display = "none";
    }
    
    return remove_button_container;
}

member_containers.forEach(
member_container => {member_container.appendChild(make_remove_button_container())}
)
if (anchored_member_control) {
    anchored_member_control[0].onclick = unanchoring;
}
function unanchoring() {
    equalize_all_members()
    const member_to_unanchor = anchored_member[0];
    const new_member_control = anchored_member_control[0];

    unanchored_members.appendChild(member_to_unanchor);
    member_to_unanchor.className = "member-container";
    
    anchored_member = document.querySelectorAll(".anchored-member");
    anchored_member_control = document.querySelectorAll(".anchored-member .member-control");
    unanchored_members = document.querySelector(".unanchored-members");
    unanchored_member_controls = document.querySelectorAll(".unanchored-members .member-control");
    
    member_to_unanchor.appendChild(cloning_mute_icon());
    member_to_unanchor.removeChild(pin);
    member_to_unanchor.removeChild(anchored_mute_icon);
    member_to_unanchor.style.width = "";
    unanchored_members.style.width = "100vw";
    new_member_control.firstElementChild.firstElementChild.src = "./pin.svg";
    new_member_control.onclick = anchoring;
}

unanchored_member_controls.forEach(
    member_control => {member_control.onclick = anchoring;}
)

function anchoring() {
    console.log(anchored_member.length);
    if (anchored_member.length === 1) {
        unanchoring();
    }        
    const member_to_anchor = this.parentNode.parentNode;
    
    member_to_anchor.className = "anchored-member";
    section.insertBefore(member_to_anchor, section.firstElementChild);
    
    anchored_member = document.querySelectorAll(".anchored-member");
    anchored_member_control = document.querySelectorAll(".anchored-member .member-control");
    unanchored_members = document.querySelector(".unanchored-members");
    unanchored_member_controls = document.querySelectorAll(".unanchored-members .member-control");
    
    const mute_icon_to_remove = member_to_anchor.querySelector(".mute-icon-container");
    member_to_anchor.removeChild(mute_icon_to_remove);
    member_to_anchor.appendChild(pin);
    member_to_anchor.appendChild(anchored_mute_icon);
    
    anchored_member[0].style.width = "72vw";
    unanchored_members.style.width = "28vw";

    this.firstElementChild.firstElementChild.src = "./unpin.svg";
    this.onclick = unanchoring;   
}