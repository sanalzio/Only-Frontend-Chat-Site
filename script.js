const characterlist = [[" ", "░"], ["q", "ɷ"], ["w", "ʎ"], ["e", "ʥ"], ["r", "ʩ"], ["t", "ʯ"], ["y", "ɉ"], ["u", "ɻ"], ["ı", "ʦ"], ["o", "ʫ"], ["p", "Ϡ"], ["ğ", "Љ"], ["ü", "ϑ"], ["a", "Ϫ"], ["s", "ϧ"], ["d", "ϡ"], ["f", "Ѿ"], ["g", "Җ"], ["h", "҉"], ["j", "Ԃ"], ["k", "Ք"], ["l", "ᾞ"], ["ş", "ᾥ"], ["i", "ﬗ"], ["z", "ﬠ"], ["x", "ﬣ"], ["c", "₫"], ["v", "ᵫ"], ["b", "ԫ"], ["n", "Ԭ"], ["m", "ԭ"], ["ö", "ԇ"], ["ç", "Ԋ"], ["\n", "Ѩ"]];
function encoder(data) {
    for (let i = 0; i < characterlist.length; i++) {
        const [o, n] = characterlist[i];
        data = data.replace(new RegExp(o, "g"), n);
    }
    return data;
}
function decoder(data) {
    for (let i = 0; i < characterlist.length; i++) {
        const [o, n] = characterlist[i];
        data = data.replace(new RegExp(n, "g"), o);
    }
    return data;
}

const gistId = 'e6f1bf11777a057896785182f34e819f';
const personalAccessToken = decoder("Җﬗʯ҉ɻԫ_ϠϪʯ_11BDTPCPY0APYﬗ5F5ԂHDᵫ4_HJʫ₫Ѿ5ԫϪ4NXϪ9WWL28ﬣPNʥWԭʯD4Rԫʯ3NCʩ87YʩRϡʥϠѾS55ZG4JKRϧﬠI0BYᵫ");
const filename = 'den.db';
// https://gist.github.com/Testzios/e6f1bf11777a057896785182f34e819f

let shifted = 0;
document.onkeydown = e => {
    switch (e.keyCode) {
        /*case 13:
            if (shifted===0){
                sbtn.click();
            }
            return;
        case 16:
            shifted = 1;
            return;*/
        case 13:
            sbtn.click();
        default:
            return;
    }
}/*
document.onkeyup = e => {
    switch (e.keyCode) {
        case 16:
            shifted = 0;
            return;
        default:
            return;
    }
}*/
var msgc = document.getElementById("msgcontainer")

let dbcon = "";
let data;

fetch(`https://api.github.com/gists/${gistId}`)
    .then(response => response.json())
    .then(gistData => {
        dbcon=gistData.files[filename].content;
        data=gistData;
        getmsgs(dbcon)
    });

const headers = {
    'Authorization': `token ${personalAccessToken}`
};
function sendmsg(data, dbcon) {
    let content = document.getElementById("con").value;
    let username = document.getElementById("uname").value;
    let password = document.getElementById("pass").value;
    if(content===""){return;}
    if(username===""){return;}
    if(username=="Sanalzio" & password!=decoder("ԭʥԭʫʩϪ_Ϡʩʫ")){alert("Wrong password.");return;}
    let con = dbcon
    let newco = content.replace("<", "&lt").replace(">", "&gt");
    dbcon += (con.endsWith("\n")) ? username + "|" + newco : `\n${username}|${newco}`;
    fetch(`https://api.github.com/gists/${gistId}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(data)
    });
}
function getmsgs(dbcon) {
    let msgs = dbcon.split("\n");
    let newinner = "";
    msgs.forEach(msg => {
        newinner += `<div class="msg"><p><b>${msg.split("|")[0]}</b></p><p>${msg.split("|").slice(1).join("|")}</p></div>`
    });
    if (newinner != msgc.innerHTML) {
        msgc.innerHTML = newinner;
    }
}

const sbtn = document.getElementById("sbtn");
sbtn.addEventListener("click", () => {
    sbtn.innerHTML = sbtn.innerHTML.replace('Send', '...');
    sendmsg(data, dbcon);
    setTimeout(() => {
        sbtn.innerHTML = sbtn.innerHTML.replace('...', 'Send');
    }, 1000);
});

setInterval(() => {
fetch(`https://api.github.com/gists/${gistId}`)
    .then(response => response.json())
    .then(gistData => {
        dbcon=gistData.files[filename].content;
        data = gistData;
        getmsgs(dbcon);
        // gistData.files[filename].content
        // const fileContent = gistData.files[filename].content;
        // console.log(fileContent);
    });
}, 3000);
