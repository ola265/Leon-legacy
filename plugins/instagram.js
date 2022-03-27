let Bot = require('../events');
let {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
let fs = require('fs');
let axios = require('axios');
let got = require('got');
let Config = require('../config');
let td = Config.WORKTYPE == 'private' ? true : false

var STORY_DESC = "Downloads story from instagram with provided username."
var INC_UA = "*❌️ Couldn't download story! This may be because of invalid instagram username or the user hasn't updated any stories.*"
var DOWN = "```Downloading stories from:``` *{}*"
var IG_DESC = "Downloads medias from instagram with provided url."
var NEED_URL = "*You must enter a instagram media url to download!*"
var INVALID_URL = "*❌️ Entered url is not valid, Please enter a valid url!*"
var IG_STALK = "Fetches the details of the instagram user with provided username."
var NEED_USERNAME = "*You must enter a instagram username!*"
var INVALID_USERNAME = "*❌️ Entered username is not valid, Please enter a valid username!*"
var ERROR = "*An unknown error occurred!*"
var UA = "Username"
var NM = "Name"
var BGY = "Biography"
var LN = "Link"
var FLWRS = "Followers"
var FLWNG = "Following"
var PST = "Posts"
var LIMITED = "*This Command was only limited for 5 days. Limited days are over!*\n```Wanna need this command permanently? Mail Us - leon.toxicdevil@gmail.com```"
if (Config.LANG == 'ML') LIMITED = "*ഈ കമാൻഡ് 5 ദിവസത്തേക്ക് മാത്രം പരിമിതപ്പെടുത്തിയിരുന്നൊള്ളു. പരിമിതമായ ദിവസങ്ങൾ കഴിഞ്ഞു!*\n```ഈ കമാൻഡ് ശാശ്വതമായി വേണോ? ഞങ്ങൾക്ക് മെയിൽ ചെയ്യുക - leon.toxicdevil@gmail.com```", STORY_DESC = "നൽകിയ ഉപയോക്തൃനാമം കൊണ്ട് ഇൻസ്റ്റാഗ്രാമിൽ നിന്ന് സ്റ്റോറി ഡൗൺലോഡ് ചെയ്യുന്നു.", INC_UA = "*❌️ സ്റ്റോറി ഡൗൺലോഡ് ചെയ്യാനായില്ല! ഇത് അസാധുവായ instagram ഉപയോക്തൃനാമം കൊണ്ടായിരിക്കാം അല്ലെങ്കിൽ ഉപയോക്താവ് സ്‌റ്റോറികളൊന്നും അപ്‌ഡേറ്റ് ചെയ്‌തിട്ടില്ല.*", DOWN = "*{}* ```നിന്ന് സ്റ്റോറികൾ ഡൗൺലോഡ് ചെയ്യുന്നു.```", IG_DESC = "നൽകിയ url ഉപയോഗിച്ച് instagram-ൽ നിന്ന് മീഡിയകൾ ഡൗൺലോഡ് ചെയ്യുന്നു.", NEED_URL = "*ഡൗൺലോഡ് ചെയ്യുന്നതിന് നിങ്ങൾ ഒരു instagram മീഡിയ url നൽകണം!*", INVALID_URL = "*❌️ നൽകിയ url സാധുതയുള്ളതല്ല, ദയവായി ഒരു സാധുവായ url നൽകുക!*", IG_STALK = "നൽകിയിരിക്കുന്ന ഉപയോക്തൃനാമം ഉപയോഗിച്ച് ഇൻസ്റ്റാഗ്രാം ഉപയോക്താവിന്റെ വിശദാംശങ്ങൾ ലഭ്യമാക്കുന്നു.", NEED_USERNAME = "നിങ്ങൾ ഒരു instagram ഉപയോക്തൃനാമം നൽകണം!", INVALID_USERNAME = "*❌️ നൽകിയ ഉപയോക്തൃനാമം സാധുവല്ല, ദയവായി ഒരു സാധുവായ ഉപയോക്തൃനാമം നൽകുക!*", ERROR = "*ഒരു ​​അജ്ഞാത പിശക് സംഭവിച്ചു!*", UA = "ഉപയോക്തൃനാമം", NM = "പേര്", BGY = "ബയോഗ്രാഫി", LN = "ലിങ്ക്", FLWRS = "അനുയായികൾ", FLWNG = "പിന്തുടരുന്നവർ", PST = "പോസ്റ്റുകൾ"
if (Config.LANG == 'ID') LIMITED = "*Perintah ini hanya terbatas selama 5 hari. Hari terbatas telah berakhir!*\n```Ingin membutuhkan perintah ini secara permanen? Kirimi Kami - leon.toxicdevil@gmail.com```", STORY_DESC = "Mengunduh cerita dari instagram dengan nama pengguna yang disediakan.", INC_UA = "*❌️ Tidak dapat mengunduh cerita! Ini mungkin karena nama pengguna instagram tidak valid atau pengguna belum memperbarui cerita apa pun.*", DOWN = "```Mengunduh cerita dari:``` *{}*", IG_DESC = "നൽകിയ url ഉപയോഗിച്ച് instagram-ൽ നിന്ന് മീഡിയകൾ ഡൗൺലോഡ് ചെയ്യുന്നു.", NEED_URL = "*ഡൗൺലോഡ് ചെയ്യുന്നതിന് നിങ്ങൾ ഒരു instagram മീഡിയ url നൽകണം!*", INVALID_URL = "*❌️ നൽകിയ url സാധുതയുള്ളതല്ല, ദയവായി ഒരു സാധുവായ url നൽകുക!*", IG_STALK = "Mengambil detail pengguna instagram dengan nama pengguna yang disediakan.", NEED_USERNAME = "Anda harus memasukkan nama pengguna instagram!", INVALID_USERNAME = "*❌️ Nama pengguna yang dimasukkan tidak valid, Harap masukkan nama pengguna yang valid!*", ERROR = "*Terjadi kesalahan yang tidak diketahui!*", UA = "Nama belakang", NM = "Nama", BGY = "Biografi", LN = "Tautan", FLWRS = "Pengikut", FLWNG = "Mengikuti", PST = "Postingan"

Bot.addCommand({pattern: 'ig ?(.*)', fromMe: td, desc: IG_DESC}, (async (message, match) => {

const _0x4b470c=_0x500e;function _0x500e(_0x3ee597,_0x25a480){const _0x2b863c=_0x2b86();return _0x500e=function(_0x500ef3,_0x363d80){_0x500ef3=_0x500ef3-0x184;let _0x21dac8=_0x2b863c[_0x500ef3];return _0x21dac8;},_0x500e(_0x3ee597,_0x25a480);}(function(_0x76d640,_0x732c4a){const _0x218935=_0x500e,_0x5281c=_0x76d640();while(!![]){try{const _0x4d4a10=parseInt(_0x218935(0x189))/0x1+-parseInt(_0x218935(0x186))/0x2+parseInt(_0x218935(0x1a1))/0x3+parseInt(_0x218935(0x18e))/0x4*(-parseInt(_0x218935(0x19a))/0x5)+parseInt(_0x218935(0x1a2))/0x6*(-parseInt(_0x218935(0x192))/0x7)+parseInt(_0x218935(0x199))/0x8*(parseInt(_0x218935(0x1a7))/0x9)+parseInt(_0x218935(0x18a))/0xa*(parseInt(_0x218935(0x19c))/0xb);if(_0x4d4a10===_0x732c4a)break;else _0x5281c['push'](_0x5281c['shift']());}catch(_0x40ed9e){_0x5281c['push'](_0x5281c['shift']());}}}(_0x2b86,0xef8a7));function _0x2b86(){const _0x2c1d90=['body','1463dLZqIA','sendReply','/downloader/instagram?url=','arraybuffer','match','sendVideo','getFullYear','2104HSnMCW','250585DZKQfu','```','20152ktcwiD','url','includes','result','Invalid\x20URL!','4526943CrosUt','51474mvIBwF','getDate','from','message','type','4518JMmrVJ','API','igs','3546012vZsQph','sendImage','private','559740ZXxCjB','19100qeDuxF','ERROR','01/04/2022','parse','92bfHomZ','WORKTYPE','caption'];_0x2b86=function(){return _0x2c1d90;};return _0x2b86();}const d=new Date(_0x4b470c(0x18c));let month=d['getMonth']()+0x1,day=d[_0x4b470c(0x1a3)](),year=d[_0x4b470c(0x198)]();if(month==0x4&&year===0x7e6&&(day==0x1||day>0x1)){if(Config[_0x4b470c(0x18f)]==_0x4b470c(0x188))return await message[_0x4b470c(0x193)](LIMITED);else return;}if(match[0x0][_0x4b470c(0x196)](_0x4b470c(0x185)))return;if(match[0x1]==='')return await message[_0x4b470c(0x193)](NEED_URL);let url=Config[_0x4b470c(0x184)]+_0x4b470c(0x194)+match[0x1],res=await got(url),json=JSON[_0x4b470c(0x18d)](res[_0x4b470c(0x191)]);if(json[_0x4b470c(0x1a5)][_0x4b470c(0x19e)](_0x4b470c(0x1a0)))return await message[_0x4b470c(0x193)](INVALID_URL);if(json[_0x4b470c(0x1a5)]['includes'](_0x4b470c(0x18b)))return await message[_0x4b470c(0x193)](ERROR);var results=json[_0x4b470c(0x19f)][_0x4b470c(0x19f)],caption=json[_0x4b470c(0x19f)][_0x4b470c(0x190)];caption=_0x4b470c(0x19b)+caption+_0x4b470c(0x19b);for(var result of results){var media=await axios['get'](result[_0x4b470c(0x19d)],{'responseType':_0x4b470c(0x195)});return result[_0x4b470c(0x1a6)]=='mp4'?await message[_0x4b470c(0x197)](Buffer[_0x4b470c(0x1a4)](media['data']),caption):await message[_0x4b470c(0x187)](Buffer[_0x4b470c(0x1a4)](media['data']),'');}
}));

Bot.addCommand({pattern: 'igs ?(.*)', fromMe: td, desc: IG_STALK}, (async (message, match) => {

function _0x5784(){const _0x27e9e6=['Invalid\x20Username','from','username','link','body','data','5688417vdcami','result','post_count','profile_pic','159bXpMKU','1762365QjIeHM','6kMBJog','followers_count','/stalk/instagram?username=','arraybuffer','*\x0a_➥\x20','message','110EgBUzo','1049853RFHjKS','following_count','1114572FLIlOu','API','01/04/2022','8MWSbip','_\x20:\x20*','includes','7316285ArNEim','sendReply','getMonth','5498172MHZviG','getDate','parse','bio','52996GcHBMM','WORKTYPE'];_0x5784=function(){return _0x27e9e6;};return _0x5784();}const _0x251176=_0x53e7;(function(_0x1e4bdb,_0x45ccca){const _0x19862b=_0x53e7,_0x48d201=_0x1e4bdb();while(!![]){try{const _0x3071f7=-parseInt(_0x19862b(0xf9))/0x1+-parseInt(_0x19862b(0xfb))/0x2+-parseInt(_0x19862b(0x114))/0x3*(-parseInt(_0x19862b(0x108))/0x4)+parseInt(_0x19862b(0x101))/0x5*(-parseInt(_0x19862b(0x116))/0x6)+parseInt(_0x19862b(0x110))/0x7+parseInt(_0x19862b(0xfe))/0x8*(parseInt(_0x19862b(0x104))/0x9)+-parseInt(_0x19862b(0xf8))/0xa*(-parseInt(_0x19862b(0x115))/0xb);if(_0x3071f7===_0x45ccca)break;else _0x48d201['push'](_0x48d201['shift']());}catch(_0xdc27fa){_0x48d201['push'](_0x48d201['shift']());}}}(_0x5784,0xc7a29));const d=new Date(_0x251176(0xfd));let month=d[_0x251176(0x103)]()+0x1,day=d[_0x251176(0x105)](),year=d['getFullYear']();if(month===0x4&&year===0x7e6&&(day==0x1||day>0x1)){if(Config[_0x251176(0x109)]=='private')return await message['sendReply'](LIMITED);else return;}function _0x53e7(_0x3dcf08,_0x4310a2){const _0x578402=_0x5784();return _0x53e7=function(_0x53e7b7,_0xeae707){_0x53e7b7=_0x53e7b7-0xf4;let _0x3fac68=_0x578402[_0x53e7b7];return _0x3fac68;},_0x53e7(_0x3dcf08,_0x4310a2);}if(match[0x1]==='')return await message[_0x251176(0x102)](NEED_USERNAME);let url=Config[_0x251176(0xfc)]+_0x251176(0xf4)+match[0x1],res=await got(url),json=JSON[_0x251176(0x106)](res[_0x251176(0x10e)]);if(json[_0x251176(0xf7)][_0x251176(0x100)](_0x251176(0x10a)))return await message[_0x251176(0x102)](INVALID_USERNAME);if(json['message'][_0x251176(0x100)]('ERROR'))return await message[_0x251176(0x102)](ERROR);let info='_➥\x20'+UA+_0x251176(0xff)+json[_0x251176(0x111)][_0x251176(0x10c)]+_0x251176(0xf6)+NM+_0x251176(0xff)+json['result']['name']+_0x251176(0xf6)+BGY+_0x251176(0xff)+json[_0x251176(0x111)][_0x251176(0x107)]+_0x251176(0xf6)+LN+'_\x20:\x20*'+json[_0x251176(0x111)][_0x251176(0x10d)]+'*\x0a_➥\x20'+FLWRS+_0x251176(0xff)+json['result'][_0x251176(0x117)]+_0x251176(0xf6)+FLWNG+_0x251176(0xff)+json[_0x251176(0x111)][_0x251176(0xfa)]+_0x251176(0xf6)+PST+'_\x20:\x20*'+json[_0x251176(0x111)][_0x251176(0x112)]+'*';try{var pp=await axios['get'](json[_0x251176(0x111)][_0x251176(0x113)],{'responseType':_0x251176(0xf5)});return await message['sendImage'](Buffer[_0x251176(0x10b)](pp[_0x251176(0x10f)]),info);}catch(_0x49c2f4){return await message['sendReply'](info);}
}));

Bot.addCommand({pattern: 'story ?(.*)', fromMe: td, desc: STORY_DESC}, (async (message, match) => {

const _0x31153b=_0x266e;(function(_0x368236,_0x693ef0){const _0x546f2c=_0x266e,_0x4530ec=_0x368236();while(!![]){try{const _0x211216=-parseInt(_0x546f2c(0xb0))/0x1+-parseInt(_0x546f2c(0xc7))/0x2*(parseInt(_0x546f2c(0xc4))/0x3)+parseInt(_0x546f2c(0xc2))/0x4+parseInt(_0x546f2c(0xb6))/0x5*(-parseInt(_0x546f2c(0xbd))/0x6)+parseInt(_0x546f2c(0xc9))/0x7*(-parseInt(_0x546f2c(0xcb))/0x8)+-parseInt(_0x546f2c(0xb2))/0x9+parseInt(_0x546f2c(0xd2))/0xa*(parseInt(_0x546f2c(0xbb))/0xb);if(_0x211216===_0x693ef0)break;else _0x4530ec['push'](_0x4530ec['shift']());}catch(_0x5e833b){_0x4530ec['push'](_0x4530ec['shift']());}}}(_0xcc8a,0xe8b51));const d=new Date(_0x31153b(0xb7));let month=d[_0x31153b(0xd3)]()+0x1,day=d[_0x31153b(0xcc)](),year=d[_0x31153b(0xd0)]();if(month===0x4&&year===0x7e6&&(day==0x1||day>0x1)){if(Config[_0x31153b(0xca)]==_0x31153b(0xc6))return await message['sendReply'](LIMITED);else return;}function _0x266e(_0x247f09,_0x51f58b){const _0xcc8aa6=_0xcc8a();return _0x266e=function(_0x266e02,_0x3cf873){_0x266e02=_0x266e02-0xaf;let _0x4e8b9a=_0xcc8aa6[_0x266e02];return _0x4e8b9a;},_0x266e(_0x247f09,_0x51f58b);}function _0xcc8a(){const _0x570e57=['story_number','492ilMetm','from','result','ERROR','parse','6395188WZUYaR','match','3grdrGf','Cannot\x20download\x20story','private','3307396TGZkRh','story_link','7313978iLYJoE','WORKTYPE','8CtguiC','getDate','/downloader/instagram-story?username=','```Story:\x20','mp4','getFullYear','API','22840130vgiapO','getMonth','arraybuffer','message','sendReply','523433sHbiKJ','sendImage','9553887IXHKRd','sendVideo','includes','replace','56715WFeBYN','01/04/2022','```','data','get','22SikyKu'];_0xcc8a=function(){return _0x570e57;};return _0xcc8a();}if(match[0x1]==='')return await message[_0x31153b(0xaf)](NEED_USERNAME);let url=Config[_0x31153b(0xd1)]+_0x31153b(0xcd)+match[0x1],res=await got(url),json=JSON[_0x31153b(0xc1)](res['body']);if(json[_0x31153b(0xd5)][_0x31153b(0xb4)](_0x31153b(0xc5)))return await message['sendReply'](INC_UA);if(json[_0x31153b(0xd5)][_0x31153b(0xb4)](_0x31153b(0xc0)))return await message[_0x31153b(0xaf)](ERROR);var results=json[_0x31153b(0xbf)];await message[_0x31153b(0xaf)](DOWN[_0x31153b(0xb5)]('{}',match[0x1]));for(var result of results){var media=await axios[_0x31153b(0xba)](result[_0x31153b(0xc8)],{'responseType':_0x31153b(0xd4)});result[_0x31153b(0xc8)][_0x31153b(0xc3)](_0x31153b(0xcf))?await message[_0x31153b(0xb3)](Buffer[_0x31153b(0xbe)](media[_0x31153b(0xb9)]),_0x31153b(0xce)+result[_0x31153b(0xbc)]+_0x31153b(0xb8)):await message[_0x31153b(0xb1)](Buffer[_0x31153b(0xbe)](media[_0x31153b(0xb9)]),_0x31153b(0xce)+result[_0x31153b(0xbc)]+_0x31153b(0xb8));}
}));
