const fetch = require('node-fetch');
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
const filename = 'dbden.txt';
// https://gist.github.com/Testzios/e6f1bf11777a057896785182f34e819f

// Gist içeriğini al
fetch(`https://api.github.com/gists/${gistId}`)
  .then(response => response.json())
  .then(gistData => {
    const fileContent = gistData.files[filename].content;
    console.log(fileContent);

    // İçeriği değiştir
    const newContent = "New content";
    gistData.files[filename].content = newContent;

    // Gist'i güncelle
    const headers = {
      'Authorization': `token ${personalAccessToken}`
    };
    fetch(`https://api.github.com/gists/${gistId}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(gistData)
    });
  });