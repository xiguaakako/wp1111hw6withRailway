/* -----------Selecting and creating elements-----------*/

const section = document.querySelector("section");

let member_containers = document.querySelectorAll(".member-container");
const member_to_clone = document.querySelector(".member-container").cloneNode(true);
let bigger_member_container = document.querySelector("#bigger-width-container");
bigger_member_container.removeAttribute('id');

let unanchored_member_controls = document.querySelectorAll(".unanchored-members .member-control");
let anchored_member_control = document.querySelectorAll(".anchored-member .member-control");

let unanchored_members = document.querySelector(".unanchored-members");
let anchored_member = document.querySelectorAll(".anchored-member");

const pin = document.querySelector("#pin");
const anchored_mute_icon = document.querySelector(".anchored-member span");

const people_count_element = document.querySelector("#people-count");
let people_count = parseInt(people_count_element.textContent);

const utility_buttons = document.querySelector(".utility-buttons");

arrange_members();

// Create a new mute icon!
function cloning_mute_icon() {
    const mute_icon_container = document.querySelector(".mute-icon-container").cloneNode(true);
    
    return mute_icon_container;
}

// Create a new member!
function cloning_member() {
    const clone_member = member_to_clone.cloneNode(true);
    const clone_member_control = clone_member.querySelector(".member-control");
    clone_member_control.onclick = anchoring;

    clone_member.appendChild(make_remove_button_container())
    const clone_member_remove_button_container = clone_member.querySelector(".remove-button-container");

    clone_member_remove_button_container.onclick = remove_member;
    return clone_member;
}

// Create a new remove button!
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
    
    
    return remove_button_container;
}

function remove_member() {
    if (this.parentNode === anchored_member[0]) unanchoring();
    this.parentNode.parentNode.removeChild(this.parentNode);
    member_containers = document.querySelectorAll(".member-container");
    people_count--;
    people_count_element.textContent = people_count.toString();
    if (people_count < 10) {
        people_count_element.style.left = "4px";
    } 
    arrange_members();
}

// Create a new add button!
function make_add_button_container() {
    const add_button_container = document.createElement("div");
    add_button_container.className = "add-button-container";
    add_button_container.style.width = "35px";
    add_button_container.style.height = "35px";

    const add_button = document.createElement("span");
    add_button.className = "add-button material-symbols-outlined";
    add_button.style["font-size"] = "22px";

    const add_button_text = document.createTextNode("add_circle");

    add_button.appendChild(add_button_text);
    add_button.style["user-select"] = "none";
    add_button_container.appendChild(add_button);

    add_button_container.style.cursor = "pointer";
    add_button_container.style.display = "flex";
    add_button_container.style["justify-content"] = "center";
    add_button_container.style["align-items"] = "center";
    add_button_container.onclick = add_member;
    
    
    return add_button_container;
}
function add_member() {
    
    if (people_count < 15){
        const new_member = cloning_member();
        unanchored_members.appendChild(new_member);
        member_containers = document.querySelectorAll(".member-container");

        people_count++;
        people_count_element.textContent = people_count.toString();
        if (people_count >= 10) {
            people_count_element.style.left = "1px";
        } 
        arrange_members();
    }
    else alert('Buy Google Meet Pro to extend the maximum of members in your meeting!');
}
utility_buttons.appendChild(make_add_button_container());

member_containers.forEach(
    member_container => {member_container.appendChild(make_remove_button_container())}
)

/*-----------Anchoring and unanchoring members-----------*/
if (anchored_member_control) {
    anchored_member_control[0].onclick = unanchoring;
}
function unanchoring() {
    const member_to_unanchor = anchored_member[0];
    const new_member_control = anchored_member_control[0];

    unanchored_members.appendChild(member_to_unanchor);
    member_to_unanchor.className = "member-container";
    
    anchored_member = document.querySelectorAll(".anchored-member");
    anchored_member_control = document.querySelectorAll(".anchored-member .member-control");
    unanchored_members = document.querySelector(".unanchored-members");
    unanchored_member_controls = document.querySelectorAll(".unanchored-members .member-control");
    member_containers = document.querySelectorAll(".member-container");

    member_to_unanchor.appendChild(cloning_mute_icon());
    member_to_unanchor.removeChild(pin);
    member_to_unanchor.removeChild(anchored_mute_icon);
    member_to_unanchor.style.width = "";
    unanchored_members.style.width = "100vw";
    new_member_control.firstElementChild.firstElementChild.src = "./pin.svg";
    new_member_control.onclick = anchoring;

    arrange_members();
}

unanchored_member_controls.forEach(
    member_control => {member_control.onclick = anchoring;}
)

function anchoring() {
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
    member_containers = document.querySelectorAll(".member-container");

    const mute_icon_to_remove = member_to_anchor.querySelector(".mute-icon-container");
    member_to_anchor.removeChild(mute_icon_to_remove);
    member_to_anchor.appendChild(pin);
    member_to_anchor.appendChild(anchored_mute_icon);
    
    anchored_member[0].style.width = "72vw";
    anchored_member[0].style.height = "calc(100vh - 71.36px)";
    unanchored_members.style.width = "28vw";

    this.firstElementChild.firstElementChild.src = "./unpin.svg";
    this.onclick = unanchoring;   

    arrange_members();
}

/*-----------Designing the layout of the members-----------*/

function tSvw(number) {
    // number.toString(), concatenate "vw";
    return number.toString() + "vw";
}
function tSvh(number) {
    // number.toString(), concatenate "vw";
    return number.toString() + "vh";
}
function arrange_members() {
    if (anchored_member.length === 1){
        const member_icon = anchored_member[0].querySelector(".member-icon");
        const member_name = anchored_member[0].querySelector(".member-name");
        member_icon.style.top = "50%";
        member_icon.style.left = "50%";
        member_icon.style.transform = "translate(-50%, -50%)";
        member_name.style.top = "100%";
        member_name.style.transform = "translate(55.2px, -29.6px)";

        if (people_count === 2 || people_count === 3){
            member_containers.forEach(
                member_container => {
                    member_container.style.width = "26vw";
                    const width = parseInt(member_container.style.width);
                    member_container.style.height = "40vh";
                    const height = parseInt(member_container.style.height);

                    const member_icon = member_container.querySelector(".member-icon");
                    const mute_icon_container = member_container.querySelector(".mute-icon-container");
                    const member_name = member_container.querySelector(".member-name");
                    member_icon.style.top = "";
                    member_icon.style.left = "";
                    member_icon.style.transform = `translate(calc(${tSvw(width/2)} - 50%), calc(${tSvh(height/2)} - 50%)) `;
                    mute_icon_container.style.transform = `translate(calc(${tSvw(width)} - 150%), 50%)`;
                    member_name.style.top = "";
                    member_name.style.transform = `translate(1vw, calc(${tSvh(height)} - 30px))`;
                }
            )
        }
        if (people_count === 4 || people_count === 6){
            member_containers.forEach(
                member_container => {
                    member_container.style.width = "13vw";
                    const width = parseInt(member_container.style.width);
                    member_container.style.height = "11vw";
                    const height = parseInt(member_container.style.height);

                    const member_icon = member_container.querySelector(".member-icon");
                    const mute_icon_container = member_container.querySelector(".mute-icon-container");
                    const member_name = member_container.querySelector(".member-name");
                    member_icon.style.top = "";
                    member_icon.style.left = "";
                    member_icon.style.transform = `translate(calc(${tSvw(width/2)} - 50%), calc(${tSvw(height/2)} - 50%))`;
                    mute_icon_container.style.transform = `translate(calc(${tSvw(width)} - 150%), 50%)`;
                    member_name.style.top = "";
                    member_name.style.transform = `translate(1vw, calc(${tSvw(height)} - 30px))`;
                }
            )
            const bigger_member = unanchored_members.lastElementChild;
            bigger_member.style.width = "19vw";
            const bigger_width = parseInt(bigger_member.style.width);
            const bigger_height = parseInt(bigger_member.style.height);

            const bigger_member_icon = bigger_member.querySelector(".member-icon");
            const bigger_mute_icon_container = bigger_member.querySelector(".mute-icon-container");
            bigger_member_icon.style.transform = `translate(calc(${tSvw(bigger_width/2)} - 50%), calc(${tSvw(bigger_height/2)} - 50%))`;
            bigger_mute_icon_container.style.transform = `translate(calc(${tSvw(bigger_width)} - 150%), 50%)`;
        }
        if (people_count === 5 || people_count === 7){
            member_containers.forEach(
                member_container => {
                    member_container.style.width = "13vw";
                    const width = parseInt(member_container.style.width);
                    member_container.style.height = "11vw";
                    const height = parseInt(member_container.style.height);

                    const member_icon = member_container.querySelector(".member-icon");
                    const mute_icon_container = member_container.querySelector(".mute-icon-container");
                    const member_name = member_container.querySelector(".member-name");
                    member_icon.style.top = "";
                    member_icon.style.left = "";
                    member_icon.style.transform = `translate(calc(${tSvw(width/2)} - 50%), calc(${tSvw(height/2)} - 50%))`;
                    mute_icon_container.style.transform = `translate(calc(${tSvw(width)} - 150%), 50%)`;
                    member_name.style.top = "";
                    member_name.style.transform = `translate(1vw, calc(${tSvw(height)} - 30px))`;
                }
            )
        }
        if (people_count === 8){
            member_containers.forEach(
                member_container => {
                    member_container.style.width = "13vw";
                    const width = parseInt(member_container.style.width);
                    member_container.style.height = "10vw";
                    const height = parseInt(member_container.style.height);

                    const member_icon = member_container.querySelector(".member-icon");
                    const mute_icon_container = member_container.querySelector(".mute-icon-container");
                    const member_name = member_container.querySelector(".member-name");
                    member_icon.style.top = "";
                    member_icon.style.left = "";
                    member_icon.style.transform = `translate(calc(${tSvw(width/2)} - 50%), calc(${tSvw(height/2)} - 50%))`;
                    mute_icon_container.style.transform = `translate(calc(${tSvw(width)} - 150%), 50%)`;
                    member_name.style.top = "";
                    member_name.style.transform = `translate(1vw, calc(${tSvw(height)} - 30px))`;
                }
            )
            const bigger_member = unanchored_members.lastElementChild;
            bigger_member.style.width = "19vw";
            const bigger_width = parseInt(bigger_member.style.width);
            const bigger_height = parseInt(bigger_member.style.height);

            const bigger_member_icon = bigger_member.querySelector(".member-icon");
            const bigger_mute_icon_container = bigger_member.querySelector(".mute-icon-container");
            bigger_member_icon.style.transform = `translate(calc(${tSvw(bigger_width/2)} - 50%), calc(${tSvw(bigger_height/2)} - 50%))`;
            bigger_mute_icon_container.style.transform = `translate(calc(${tSvw(bigger_width)} - 150%), 50%)`;
        }
        if (people_count === 9){
            member_containers.forEach(
                member_container => {
                    member_container.style.width = "13vw";
                    const width = parseInt(member_container.style.width);
                    member_container.style.height = "10vw";
                    const height = parseInt(member_container.style.height);

                    const member_icon = member_container.querySelector(".member-icon");
                    const mute_icon_container = member_container.querySelector(".mute-icon-container");
                    const member_name = member_container.querySelector(".member-name");
                    member_icon.style.top = "";
                    member_icon.style.left = "";
                    member_icon.style.transform = `translate(calc(${tSvw(width/2)} - 50%), calc(${tSvw(height/2)} - 50%))`;
                    mute_icon_container.style.transform = `translate(calc(${tSvw(width)} - 150%), 50%)`;
                    member_name.style.top = "";
                    member_name.style.transform = `translate(1vw, calc(${tSvw(height)} - 30px))`;
                }
            )
        }
        
        if (people_count === 10){
            member_containers.forEach(
                member_container => {
                    member_container.style.width = "13vw";
                    const width = parseInt(member_container.style.width);
                    member_container.style.height = "7vw";
                    const height = parseInt(member_container.style.height);

                    const member_icon = member_container.querySelector(".member-icon");
                    const mute_icon_container = member_container.querySelector(".mute-icon-container");
                    const member_name = member_container.querySelector(".member-name");
                    member_icon.style.top = "";
                    member_icon.style.left = "";
                    member_icon.style.transform = `translate(calc(${tSvw(width/2)} - 50%), calc(${tSvw(height/2)} - 50%))`;
                    mute_icon_container.style.transform = `translate(calc(${tSvw(width)} - 150%), 50%)`;
                    member_name.style.top = "";
                    member_name.style.transform = `translate(1vw, calc(${tSvw(height)} - 30px))`;
                }
            )
            const bigger_member = unanchored_members.lastElementChild;
            bigger_member.style.width = "19vw";
            const bigger_width = parseInt(bigger_member.style.width);
            const bigger_height = parseInt(bigger_member.style.height);

            const bigger_member_icon = bigger_member.querySelector(".member-icon");
            const bigger_mute_icon_container = bigger_member.querySelector(".mute-icon-container");
            bigger_member_icon.style.transform = `translate(calc(${tSvw(bigger_width/2)} - 50%), calc(${tSvw(bigger_height/2)} - 50%))`;
            bigger_mute_icon_container.style.transform = `translate(calc(${tSvw(bigger_width)} - 150%), 50%)`;
        }
        if (people_count === 11){
            member_containers.forEach(
                member_container => {
                    member_container.style.width = "13vw";
                    const width = parseInt(member_container.style.width);
                    member_container.style.height = "7vw";
                    const height = parseInt(member_container.style.height);

                    const member_icon = member_container.querySelector(".member-icon");
                    const mute_icon_container = member_container.querySelector(".mute-icon-container");
                    const member_name = member_container.querySelector(".member-name");
                    member_icon.style.top = "";
                    member_icon.style.left = "";
                    member_icon.style.transform = `translate(calc(${tSvw(width/2)} - 50%), calc(${tSvw(height/2)} - 50%))`;
                    mute_icon_container.style.transform = `translate(calc(${tSvw(width)} - 150%), 50%)`;
                    member_name.style.top = "";
                    member_name.style.transform = `translate(1vw, calc(${tSvw(height)} - 30px))`;
                }
            )
        }
        if (people_count === 12){
            member_containers.forEach(
                member_container => {
                    member_container.style.width = "13vw";
                    const width = parseInt(member_container.style.width);
                    member_container.style.height = "6vw";
                    const height = parseInt(member_container.style.height);

                    const member_icon = member_container.querySelector(".member-icon");
                    const mute_icon_container = member_container.querySelector(".mute-icon-container");
                    const member_name = member_container.querySelector(".member-name");
                    member_icon.style.top = "";
                    member_icon.style.left = "";
                    member_icon.style.transform = `translate(calc(${tSvw(width/2)} - 50%), calc(${tSvw(height/2)} - 50%)) scale(0.9)`;
                    mute_icon_container.style.transform = `translate(calc(${tSvw(width)} - 150%), 50%)`;
                    member_name.style.top = "";
                    member_name.style.transform = `translate(1vw, calc(${tSvw(height)} - 30px))`;
                }
            )
            const bigger_member = unanchored_members.lastElementChild;
            bigger_member.style.width = "19vw";
            const bigger_width = parseInt(bigger_member.style.width);
            const bigger_height = parseInt(bigger_member.style.height);

            const bigger_member_icon = bigger_member.querySelector(".member-icon");
            const bigger_mute_icon_container = bigger_member.querySelector(".mute-icon-container");
            bigger_member_icon.style.transform = `translate(calc(${tSvw(bigger_width/2)} - 50%), calc(${tSvw(bigger_height/2)} - 50%)) scale(0.9) `;
            bigger_mute_icon_container.style.transform = `translate(calc(${tSvw(bigger_width)} - 150%), 50%)`;
        }
        if (people_count === 13){
            member_containers.forEach(
                member_container => {
                    member_container.style.width = "13vw";
                    const width = parseInt(member_container.style.width);
                    member_container.style.height = "6vw";
                    const height = parseInt(member_container.style.height);

                    const member_icon = member_container.querySelector(".member-icon");
                    const mute_icon_container = member_container.querySelector(".mute-icon-container");
                    const member_name = member_container.querySelector(".member-name");
                    member_icon.style.top = "";
                    member_icon.style.left = "";
                    member_icon.style.transform = `translate(calc(${tSvw(width/2)} - 50%), calc(${tSvw(height/2)} - 50%)) scale(0.9)`;
                    mute_icon_container.style.transform = `translate(calc(${tSvw(width)} - 150%), 50%)`;
                    member_name.style.top = "";
                    member_name.style.transform = `translate(1vw, calc(${tSvw(height)} - 30px))`;
                }
            )
        }
        if (people_count === 14){
            member_containers.forEach(
                member_container => {
                    member_container.style.width = "13vw";
                    const width = parseInt(member_container.style.width);
                    member_container.style.height = "5vw";
                    const height = parseInt(member_container.style.height);

                    const member_icon = member_container.querySelector(".member-icon");
                    const mute_icon_container = member_container.querySelector(".mute-icon-container");
                    const member_name = member_container.querySelector(".member-name");
                    member_icon.style.top = "";
                    member_icon.style.left = "";
                    member_icon.style.transform = `translate(calc(${tSvw(width/2)} - 50%), calc(${tSvw(height/2)} - 50%)) scale(0.75)`;
                    mute_icon_container.style.transform = `translate(calc(${tSvw(width)} - 150%), 50%)`;
                    member_name.style.top = "";
                    member_name.style.transform = `translate(1vw, calc(${tSvw(height)} - 30px))`;
                }
            )
            const bigger_member = unanchored_members.lastElementChild;
            bigger_member.style.width = "19vw";
            const bigger_width = parseInt(bigger_member.style.width);
            const bigger_height = parseInt(bigger_member.style.height);

            const bigger_member_icon = bigger_member.querySelector(".member-icon");
            const bigger_mute_icon_container = bigger_member.querySelector(".mute-icon-container");
            bigger_member_icon.style.transform = `translate(calc(${tSvw(bigger_width/2)} - 50%), calc(${tSvw(bigger_height/2)} - 50%)) scale(0.75)`;
            bigger_mute_icon_container.style.transform = `translate(calc(${tSvw(bigger_width)} - 150%), 50%)`;
        }
        if (people_count === 15){
            member_containers.forEach(
                member_container => {
                    member_container.style.width = "13vw";
                    const width = parseInt(member_container.style.width);
                    member_container.style.height = "5vw";
                    const height = parseInt(member_container.style.height);

                    const member_icon = member_container.querySelector(".member-icon");
                    const mute_icon_container = member_container.querySelector(".mute-icon-container");
                    const member_name = member_container.querySelector(".member-name");
                    member_icon.style.top = "";
                    member_icon.style.left = "";
                    member_icon.style.transform = `translate(calc(${tSvw(width/2)} - 50%), calc(${tSvw(height/2)} - 50%)) scale(0.75)`;
                    mute_icon_container.style.transform = `translate(calc(${tSvw(width)} - 150%), 50%)`;
                    member_name.style.top = "";
                    member_name.style.transform = `translate(1vw, calc(${tSvw(height)} - 30px))`;
                }
            )
        }
    }
    else {
        unanchored_members.width = "100vw";
        
    }
    
}
