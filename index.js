const rand = require('bmjs-random');
const fs = require('fs');

module.exports = {
  xmlFile: '',
  audioMetadata: [],
  uploadMetadata: {},
  slideTemplate: [
    {
      title: '',
      description: '',
      category: 0,
      privacy: '',
      clips: [
        {
          text: '',
          audio: '',
          image: '',
          keyword: '',
          template: ''
        }
      ]
    }
  ],
  outputVoice: 'karen',
  projectFormatID: 'r1',
  whitesID: 'r2',
  crossDissolveID: 'r3',
  audioCrossfadeID: 'r4',
  basicTitleID: 'r5',
  clotheslineID: 'r6',
  dropInID: 'r7',
  pushID: 'r8',
  rotateID: 'r9',
  scaleID: 'r10',
  slideID: 'r11',
  spinID: 'r12',
  swapID: 'r13',
  swingID: 'r14',
  imageFormatID: 'r15',
  audioFormatID: 'r16',
  music1: 'r17',
  music2: 'r18',
  music3: 'r19',
  music4: 'r20',
  music5: 'r21',
  music6: 'r22',
  music7: 'r23',
  music8: 'r24',
  music9: 'r25',
  music10: 'r26',
  music11: 'r27',
  transitionDuration: '600/2400s',
  videoAssetsPath: __dirname + '/assets/',
  startReferenceID: 28,
  currentReferenceID: 28,
  startTitleID: 1,
  currentTitleID: 1,
  currentProjectDuration: 0,
  init: function() {
    this.xmlFile = '';
    this.currentReferenceID = 28;
    this.currentTitleID = 1;
    this.currentProjectDuration = 0;
    this.uploadMetadata = {};
    this.audioMetadata = [];
    this.outputVoice = 'karen';
  },
  setVoice: function(voice) {
    if (voice && typeof voice === 'string') {
      this.outputVoice = voice;
    }
  },
  CrossDissolve: function(duration,offset) {
    return `<transition name="Cross Dissolve" offset="${offset}" duration="${duration}">
    <filter-video ref="${this.crossDissolveID}" name="Cross Dissolve">
    <param name="Look" key="1" value="11 (Video)"/>
    <param name="Amount" key="2" value="50"/>
    <param name="Ease" key="50" value="2 (In &amp; Out)"/>
    <param name="Ease Amount" key="51" value="0"/>
    </filter-video>
    <filter-audio ref="${this.audioCrossfadeID}" name="Audio Crossfade"/>
    </transition>
    `;
  },
  Clothesline: function(duration,offset) {
    return `<transition name="Clothesline" offset="${offset}" duration="${duration}">
    <filter-video ref="${this.clotheslineID}" name="Clothesline"/>
    <filter-audio ref="${this.audioCrossfadeID}" name="Audio Crossfade"/>
    </transition>
    `;
  },
  DropIn: function(duration,offset) {
    return `<transition name="Drop In" offset="${offset}" duration="${duration}">
    <filter-video ref="${this.dropInID}" name="Drop In"/>
    <filter-audio ref="${this.audioCrossfadeID}" name="Audio Crossfade"/>
    </transition>
    `;
  },
  Push: function(duration,offset) {
    return `<transition name="Push" offset="${offset}" duration="${duration}">
    <filter-video ref="${this.pushID}" name="Push"/>
    <filter-audio ref="${this.audioCrossfadeID}" name="Audio Crossfade"/>
    </transition>
    `;
  },
  Rotate: function(duration,offset) {
    return `<transition name="Rotate" offset="${offset}" duration="${duration}">
    <filter-video ref="${this.rotateID}" name="Rotate"/>
    <filter-audio ref="${this.audioCrossfadeID}" name="Audio Crossfade"/>
    </transition>
    `;
  },
  Scale: function(duration,offset) {
    return `<transition name="Scale" offset="${offset}" duration="${duration}">
    <filter-video ref="${this.scaleID}" name="Scale"/>
    <filter-audio ref="${this.audioCrossfadeID}" name="Audio Crossfade"/>
    </transition>
    `;
  },
  Slide: function(duration,offset) {
    return `<transition name="Slide" offset="${offset}" duration="${duration}">
    <filter-video ref="${this.slideID}" name="Slide">
    <param name="Type" key="5" value="0 (Slide In)"/>
    <param name="Direction" key="4" value="2 (Right)"/>
    </filter-video>
    <filter-audio ref="${this.audioCrossfadeID}" name="Audio Crossfade"/>
    </transition>
    `;
  },
  Spin: function(duration,offset) {
    return `<transition name="Spin" offset="${offset}" duration="${duration}">
    <filter-video ref="${this.spinID}" name="Spin">
    <param name="Direction" key="1" value="0 (Automatic)"/>
    <param name="Angle" key="3" value="45"/>
    </filter-video>
    <filter-audio ref="${this.audioCrossfadeID}" name="Audio Crossfade"/>
    </transition>
    `;
  },
  Swap: function(duration,offset) {
    return `<transition name="Swap" offset="${offset}" duration="${duration}">
    <filter-video ref="${this.swapID}" name="Swap">
    <param name="Direction" key="3" value="1 (Right)"/>
    </filter-video>
    <filter-audio ref="${this.audioCrossfadeID}" name="Audio Crossfade"/>
    </transition>
    `;
  },
  Swing: function(duration,offset) {
    return `<transition name="Swing" offset="${offset}" duration="${duration}">
    <filter-video ref="${this.swingID}" name="Swing"/>
    <filter-audio ref="${this.audioCrossfadeID}" name="Audio Crossfade"/>
    </transition>
    `;
  },
  InBottomLeft: function(imageName,imageID,duration,offset) {
    return `<video name="${imageName}" offset="${offset}" ref="${imageID}" duration="${duration}" start="3600s">
    <adjust-crop mode="pan">
    <pan-rect top="0" left="0" bottom="0" right="0"/>
    <pan-rect top="14.2553" left="1.75979" bottom="0.74466" right="24.9069"/>
    </adjust-crop>
    </video>
    `;
  },
  InBottomRight: function(imageName,imageID,duration,offset) {
    return `<video name="${imageName}" offset="${offset}" ref="${imageID}" duration="${duration}" start="3600s">
    <adjust-crop mode="pan">
    <pan-rect top="0" left="0" bottom="0" right="0"/>
    <pan-rect top="14.2553" left="25.3344" bottom="0.74466" right="1.33232"/>
    </adjust-crop>
    </video>
    `;
  },
  InCenter: function(imageName,imageID,duration,offset) {
    return `<video name="${imageName}" offset="${offset}" ref="${imageID}" duration="${duration}" start="3600s">
    <adjust-crop mode="pan">
    <pan-rect top="0" left="0" bottom="0" right="0"/>
    <pan-rect top="7.29342" left="13.2237" bottom="7.70658" right="13.443"/>
    </adjust-crop>
    </video>
    `;
  },
  InTopLeft: function(imageName,imageID,duration,offset) {
    return `<video name="${imageName}" offset="${offset}" ref="${imageID}" duration="${duration}" start="3600s">
    <adjust-crop mode="pan">
    <pan-rect top="0" left="0" bottom="0" right="0"/>
    <pan-rect top="0.62071" left="1.35298" bottom="14.3793" right="25.3137"/>
    </adjust-crop>
    </video>
    `;
  },
  InTopRight: function(imageName,imageID,duration,offset) {
    return `<video name="${imageName}" offset="${offset}" ref="${imageID}" duration="${duration}" start="3600s">
    <adjust-crop mode="pan">
    <pan-rect top="0" left="0" bottom="0" right="0"/>
    <pan-rect top="0.62071" left="25.1294" bottom="14.3793" right="1.53731"/>
    </adjust-crop>
    </video>
    `;
  },
  OutBottomLeft: function(imageName,imageID,duration,offset) {
    return `<video name="${imageName}" offset="${offset}" ref="${imageID}" duration="${duration}" start="3600s">
    <adjust-crop mode="pan">
    <pan-rect top="14.2553" left="1.75979" bottom="0.74466" right="24.9069"/>
    <pan-rect top="0" left="0" bottom="0" right="0"/>
    </adjust-crop>
    </video>
    `;
  },
  OutBottomRight: function(imageName,imageID,duration,offset) {
    return `<video name="${imageName}" offset="${offset}" ref="${imageID}" duration="${duration}" start="3600s">
    <adjust-crop mode="pan">
    <pan-rect top="14.2553" left="25.3344" bottom="0.74466" right="1.33232"/>
    <pan-rect top="0" left="0" bottom="0" right="0"/>
    </adjust-crop>
    </video>
    `;
  },
  OutCenter: function(imageName,imageID,duration,offset) {
    return `<video name="${imageName}" offset="${offset}" ref="${imageID}" duration="${duration}" start="3600s">
    <adjust-crop mode="pan">
    <pan-rect top="7.29342" left="13.2237" bottom="7.70658" right="13.443"/>
    <pan-rect top="0" left="0" bottom="0" right="0"/>
    </adjust-crop>
    </video>
    `;
  },
  OutTopLeft: function(imageName,imageID,duration,offset) {
    return `<video name="${imageName}" offset="${offset}" ref="${imageID}" duration="${duration}" start="3600s">
    <adjust-crop mode="pan">
    <pan-rect top="0.62071" left="1.35298" bottom="14.3793" right="25.3137"/>
    <pan-rect top="0" left="0" bottom="0" right="0"/>
    </adjust-crop>
    </video>
    `;
  },
  OutTopRight: function(imageName,imageID,duration,offset) {
    return `<video name="${imageName}" offset="${offset}" ref="${imageID}" duration="${duration}" start="3600s">
    <adjust-crop mode="pan">
    <pan-rect top="0.62071" left="25.1294" bottom="14.3793" right="1.53731"/>
    <pan-rect top="0" left="0" bottom="0" right="0"/>
    </adjust-crop>
    </video>
    `;
  },
  FullTitle: function(text,currentTitleID,duration,offset) {
    return `<title name="${text}" offset="${offset}" ref="${this.basicTitleID}" duration="${duration}" start="3600s">
    <param name="Flatten" key="9999/999166631/999166633/2/351" value="1"/>
    <param name="Alignment" key="9999/999166631/999166633/2/354/999169573/401" value="1 (Center)"/>
    <param name="Alignment" key="9999/999166631/999166633/2/373" value="0 (Left) 1 (Middle)"/>
    <text>
    <text-style ref="${currentTitleID}">${text}</text-style>
    </text>
    <text-style-def id="${currentTitleID}">
    <text-style font="Bodoni 72 Oldstyle" fontSize="150" fontFace="Book" fontColor="0 0 0 1" alignment="center"/>
    </text-style-def>
    </title>
    `;
  },
  LowerThirdTitle: function(text,currentTitleID,duration,offset) {
    return `<title name="${text}" offset="${offset}" ref="${this.basicTitleID}" duration="${duration}" start="3600s">
    <param name="Flatten" key="9999/999166631/999166633/2/351" value="1"/>
    <param name="Alignment" key="9999/999166631/999166633/2/354/999169573/401" value="1 (Center)"/>
    <param name="Alignment" key="9999/999166631/999166633/2/373" value="0 (Left) 1 (Middle)"/>
    <text>
    <text-style ref="${currentTitleID}">${text}</text-style>
    </text>
    <text-style-def id="${currentTitleID}">
    <text-style font="Bodoni 72 Oldstyle" fontSize="120" fontFace="Book" fontColor="0 0 0 1" alignment="center"/>
    </text-style-def>
    <adjust-transform position="0 -38.6111"/>
    </title>
    `;
  },
  LowerThirdBackground: function(duration,offset) {
    return `<video name="Whites" offset="${offset}" ref="${this.whitesID}" duration="${duration}" start="3600s">
    <param name="Color" key="9999/10067/100/10068/2/100" value="5 (Bright White)"/>
    <adjust-crop mode="trim">
    <trim-rect top="76.3889" bottom="5.55556"/>
    </adjust-crop>
    <adjust-blend amount="0.4"/>
    </video>
    `;
  },
  randomVideoTransition: function(duration,offset) {
    return rand(
      this.CrossDissolve(duration,offset),
      this.Clothesline(duration,offset),
      this.DropIn(duration,offset),
      this.Push(duration,offset),
      this.Rotate(duration,offset),
      this.Scale(duration,offset),
      this.Slide(duration,offset),
      this.Spin(duration,offset),
      this.Swap(duration,offset),
      this.Swing(duration,offset)
    );
  },
  randomTitleTransition: function(duration,offset) {
    return rand(
      this.CrossDissolve(duration,offset),
      this.DropIn(duration,offset),
      this.Push(duration,offset),
      this.Rotate(duration,offset),
      this.Scale(duration,offset),
      this.Slide(duration,offset),
      this.Spin(duration,offset)
    );
  },
  randomImagePan: function(imageName,imageID,duration,offset) {
    return rand(
      this.InBottomLeft(imageName,imageID,duration,offset),
      this.InBottomRight(imageName,imageID,duration,offset),
      this.InTopLeft(imageName,imageID,duration,offset),
      this.InTopRight(imageName,imageID,duration,offset),
      this.InCenter(imageName,imageID,duration,offset),
      this.OutBottomLeft(imageName,imageID,duration,offset),
      this.OutBottomRight(imageName,imageID,duration,offset),
      this.OutTopLeft(imageName,imageID,duration,offset),
      this.OutTopRight(imageName,imageID,duration,offset),
      this.OutCenter(imageName,imageID,duration,offset)
    );
  },
  randomMusicTrack: function() {
    return rand(
      {name: "Bright_Future", id: "r17"},
      {name: "Bring_It_Up", id: "r18"},
      {name: "Don_t_Look", id: "r19"},
      {name: "Hollywood_High", id: "r20"},
      {name: "I_Love_You", id: "r21"},
      {name: "Over_Time", id: "r22"},
      {name: "Reasons_To_Smile", id: "r23"},
      {name: "Sunday_Plans", id: "r24"},
      {name: "Undeniable", id: "r25"},
      {name: "Venice_Beach", id: "r26"},
      {name: "Where_I_Am_From", id: "r27"}
    );
  },
  assetsXML: function() {
    return `<format id="${this.projectFormatID}" name="FFVideoFormat720p24" frameDuration="100/2400s" width="1280" height="720"/>
    <effect id="${this.whitesID}" name="Whites" uid=".../Generators.localized/Solids.localized/Whites.localized/Whites.motn"/>
    <effect id="${this.crossDissolveID}" name="Cross Dissolve" uid="FxPlug:4731E73A-8DAC-4113-9A30-AE85B1761265"/>
    <effect id="${this.audioCrossfadeID}" name="Audio Crossfade" uid="FFAudioTransition"/>
    <effect id="${this.basicTitleID}" name="Basic Title" uid=".../Titles.localized/Bumper:Opener.localized/Basic Title.localized/Basic Title.moti"/>
    <effect id="${this.clotheslineID}" name="Clothesline" uid=".../Transitions.localized/Movements.localized/Clothesline.localized/Clothesline.motr"/>
    <effect id="${this.dropInID}" name="Drop In" uid=".../Transitions.localized/Movements.localized/Drop In.localized/Drop In.motr"/>
    <effect id="${this.pushID}" name="Push" uid=".../Transitions.localized/Movements.localized/Push.localized/Push.motr"/>
    <effect id="${this.rotateID}" name="Rotate" uid=".../Transitions.localized/Movements.localized/Rotate.localized/Rotate.motr"/>
    <effect id="${this.scaleID}" name="Scale" uid=".../Transitions.localized/Movements.localized/Scale.localized/Scale.motr"/>
    <effect id="${this.slideID}" name="Slide" uid="FxPlug:6AAB0D54-FCD8-4EBD-A62D-D352A5ED1648"/>
    <effect id="${this.spinID}" name="Spin" uid="FxPlug:196B9DB2-28FD-420F-9BA1-3F0E9EEBBAAA"/>
    <format id="${this.imageFormatID}" name="FFVideoFormatRateUndefined" width="1280" height="720"/>
    <format id="${this.audioFormatID}" name="FFVideoFormatRateUndefined"/>
    <effect id="${this.swapID}" name="Swap" uid="FxPlug:ED30AF7F-E5F2-4E1D-9ED8-74F6F055887F"/>
    <effect id="${this.swingID}" name="Swing" uid=".../Transitions.localized/Movements.localized/Swing.localized/Swing.motr"/>
    <asset id="${this.music1}" name="Bright_Future" uid="D4B213A2F40498A916009A4E8667A3B7" src="${"file://" + this.videoAssetsPath + "Bright_Future.mp3"}" start="0s" duration="7717248/44100s" hasAudio="1" audioSources="1" audioChannels="2" audioRate="44100"/>
    <asset id="${this.music2}" name="Bring_it_up" uid="96A15E699FA10811C40F093946DF3F52" src="${"file://" + this.videoAssetsPath + "Bring_it_up.mp3"}" start="0s" duration="7853184/44100s" hasAudio="1" audioSources="1" audioChannels="2" audioRate="44100"/>
    <asset id="${this.music3}" name="Don_t_Look" uid="BD80E52FB35E00EBA743416B86CD602B" src="${"file://" + this.videoAssetsPath + "Don_t_Look.mp3"}" start="0s" duration="11718144/44100s" hasAudio="1" audioSources="1" audioChannels="2" audioRate="44100"/>
    <asset id="${this.music4}" name="Hollywood_High" uid="50F80E752E96DABCDC93AA2759893FBA" src="${"file://" + this.videoAssetsPath + "Hollywood_High.mp3"}" start="0s" duration="8574336/44100s" hasAudio="1" audioSources="1" audioChannels="2" audioRate="44100"/>
    <asset id="${this.music5}" name="I_Love_You" uid="D51891EBABC0F1891335E1DDF0E12312" src="${"file://" + this.videoAssetsPath + "I_Love_You.mp3"}" start="0s" duration="8756352/44100s" hasAudio="1" audioSources="1" audioChannels="2" audioRate="44100"/>
    <asset id="${this.music6}" name="Over_Time" uid="540A25F6BF679E43DFFBA148EFFB5C2A" src="${"file://" + this.videoAssetsPath + "Over_Time.mp3"}" start="0s" duration="8021376/44100s" hasAudio="1" audioSources="1" audioChannels="2" audioRate="44100"/>
    <asset id="${this.music7}" name="Reasons_to_Smile" uid="8810E3402684878ECE8B03C292F5A129" src="${"file://" + this.videoAssetsPath + "Reasons_to_Smile.mp3"}" start="0s" duration="8464896/44100s" hasAudio="1" audioSources="1" audioChannels="2" audioRate="44100"/>
    <asset id="${this.music8}" name="Sunday_Plans" uid="D70E13F2EB1C1D25C5981C5ACC634156" src="${"file://" + this.videoAssetsPath + "Sunday_Plans.mp3"}" start="0s" duration="7498368/44100s" hasAudio="1" audioSources="1" audioChannels="2" audioRate="44100"/>
    <asset id="${this.music9}" name="Undeniable" uid="64880D3F07110BD686ED7F8650283C9C" src="${"file://" + this.videoAssetsPath + "Undeniable.mp3"}" start="0s" duration="8777088/44100s" hasAudio="1" audioSources="1" audioChannels="2" audioRate="44100"/>
    <asset id="${this.music10}" name="Venice_Beach" uid="C4DB24601F715BBCB1B98E8FEBBB99D9" src="${"file://" + this.videoAssetsPath + "Venice_Beach.mp3"}" start="0s" duration="7805952/44100s" hasAudio="1" audioSources="1" audioChannels="2" audioRate="44100"/>
    <asset id="${this.music11}" name="Where_I_am_From" uid="085466F06BDA75E28D0F767E193E0FDE" src="${"file://" + this.videoAssetsPath + "Where_I_am_From.mp3"}" start="0s" duration="9489024/44100s" hasAudio="1" audioSources="1" audioChannels="2" audioRate="44100"/>
    `
  },
  openingTags: function() {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE fcpxml>
    <fcpxml version="1.6">
    <resources>
    `;
  },
  middleTags: function(name) {
    return `</resources>
    <library>
    <event name="${name || 'Projects'}">
    `;
  },
  closingTags: function(name) {
    return `</event>
    <smart-collection name="${name || 'Projects'}" match="all">
    <match-clip rule="is" type="project"/>
    </smart-collection>
    <smart-collection name="All Video" match="any">
    <match-media rule="is" type="videoOnly"/>
    <match-media rule="is" type="videoWithAudio"/>
    </smart-collection>
    <smart-collection name="Audio Only" match="all">
    <match-media rule="is" type="audioOnly"/>
    </smart-collection>
    <smart-collection name="Stills" match="all">
    <match-media rule="is" type="stills"/>
    </smart-collection>
    <smart-collection name="Favorites" match="all">
    <match-ratings value="favorites"/>
    </smart-collection>
    </library>
    </fcpxml>
    `;
  },
  makeClip: function(videoImage,audioText,videoText,videoDuration,videoOffset) {
    if (videoDuration === undefined || videoOffset === undefined || typeof videoDuration !== 'number' || typeof videoOffset !== 'number') {
      throw Error('Unable to generate video slide without duration.');
    }
    let videoDurationText = videoDuration + 's';
    let videoOffsetText = videoOffset + 's';
    let transitionOffsetText = this.calculateTransitionStartFromLength(videoDuration,this.transitionDuration);
    let currentImageReferenceText, currentAudioReferenceText, currentClipReferenceText, currentTitleReferenceText, imageFile, audioFile, clipFile;
    if (videoImage && audioText) {
      currentImageReferenceText = 'r' + this.currentReferenceID;
      currentAudioReferenceText = 'r' + (this.currentReferenceID + 1);
      currentClipReferenceText = 'r' + (this.currentReferenceID + 2);
      imageFile = 'image-' + currentImageReferenceText;
      audioFile = 'audio-' + currentAudioReferenceText;
      clipFile = 'clip-' + currentClipReferenceText;
      this.currentReferenceID += 3;
    }
    else if (videoImage) {
      currentImageReferenceText = 'r' + this.currentReferenceID;
      currentClipReferenceText = 'r' + (this.currentReferenceID + 1);
      imageFile = 'image-' + currentImageReferenceText;
      clipFile = 'clip-' + currentClipReferenceText;
      this.currentReferenceID += 2;
    }
    else if (audioText) {
      currentAudioReferenceText = 'r' + this.currentReferenceID;
      currentClipReferenceText = 'r' + (this.currentReferenceID + 1);
      audioFile = 'audio-' + currentAudioReferenceText;
      clipFile = 'clip-' + currentClipReferenceText;
      this.currentReferenceID += 2;
    }
    else {
      currentClipReferenceText = 'r' + this.currentReferenceID;
      clipFile = 'clip-' + currentClipReferenceText;
      this.currentReferenceID += 1;
    }
    if (videoText) {
      currentTitleReferenceText = 'ts' + this.currentTitleID;
      this.currentTitleID += 1;
    }
    let clip = {
      xml: '',
      reference: currentClipReferenceText
    };
    if (videoImage) {
      clip.xml +=
      `<asset id="${currentImageReferenceText}" name="${imageFile}" src="${'file://' + this.videoAssetsPath + videoImage}" start="0s" duration="${videoDurationText}" hasVideo="1" format="${this.imageFormatID}"/>
      `;
    }
    if (audioText) {
      this.addAudioMetadata(audioText,audioFile,this.outputVoice);
      clip.xml +=
      `<asset id="${currentAudioReferenceText}" name="${audioFile}" src="${'file://' + this.videoAssetsPath + audioFile + '.aiff'}" start="0s" duration="${videoDurationText}" hasAudio="1" audioSources="1" audioChannels="1" audioRate="22050"/>
      `;
    }
    clip.xml +=
    `<media id="${currentClipReferenceText}" name="${clipFile}">
    <sequence duration="${videoDurationText}" format="${this.projectFormatID}" renderColorSpace="Rec. 709" tcStart="0s" audioLayout="stereo" audioRate="48k">
    <spine>
    <video name="Whites" offset="0s" ref="${this.whitesID}" duration="${videoDurationText}" start="3600s">
    <param name="Color" key="9999/10067/100/10068/2/100" value="5 (Bright White)"/>
    `;
    if (audioText) {
      clip.xml +=
      `<clip name="${audioFile}" lane="-1" offset="3600s" duration="${videoDurationText}" format="${this.audioFormatID}">
      <audio offset="0s" ref="${currentAudioReferenceText}" duration="${videoDurationText}" role="dialogue.dialogue-1" srcCh="1"/>
      </clip>
      `;
    }
    clip.xml +=
    `<spine lane="1" offset="3600s">
    `;
    if (videoImage) {
      clip.xml += this.randomVideoTransition(this.transitionDuration,videoOffsetText);
      clip.xml += this.randomImagePan(imageFile,currentImageReferenceText,videoDurationText,videoOffsetText);
      clip.xml += this.randomVideoTransition(this.transitionDuration,transitionOffsetText);
    }
    else if (videoText) {
      clip.xml += this.randomTitleTransition(this.transitionDuration,videoOffsetText);
      clip.xml += this.FullTitle(videoText,currentTitleReferenceText,videoDurationText,videoOffsetText);
      clip.xml += this.randomTitleTransition(this.transitionDuration,transitionOffsetText);
    }
    clip.xml +=
    `</spine>
    `;
    if (videoImage && videoText) {
      clip.xml +=
      `<spine lane="2" offset="3600s">
      `;
      clip.xml += this.Slide('1200/2400s',videoOffsetText);
      clip.xml += this.LowerThirdBackground(videoDurationText,videoOffsetText);
      clip.xml += this.CrossDissolve(this.transitionDuration,transitionOffsetText);
      clip.xml +=
      `</spine>
      <spine lane="3" offset="3600s">
      `;
      clip.xml += this.Slide('1200/2400s',videoOffsetText);
      clip.xml += this.LowerThirdTitle(videoText,currentTitleReferenceText,videoDurationText,videoOffsetText);
      clip.xml += this.CrossDissolve(this.transitionDuration,transitionOffsetText);
      clip.xml +=
      `</spine>
      `;
    }
    clip.xml +=
    `</video>
    </spine>
    </sequence>
    </media>
    `;
    clip.xml = clip.xml.replace(/\n\s*/g,'\n');
    return clip;
  },
  calculateVideoLengthFromText: function(videoText) {
    if (!videoText || typeof videoText !== 'string') {
      throw Error('Text must be entered to calculate video length');
    }
    if (!videoText.includes(' ')) {
      return 5;
    }
    let words = videoText.split(' ').length;
    return Math.floor(words / 3) + 1;
  },
  calculateTransitionStartFromLength: function(videoLength,transitionLength) {
    if (!transitionLength || !videoLength) {
      throw Error('Unable to calculate transition offset without length.');
    }
    if (transitionLength === '600/2400s') {
      return ((videoLength * 2400) - 600) + '/2400s';
    }
    else if (transitionLength === '1200/2400s') {
      return ((videoLength * 2400) - 1200) + '/2400s';
    }
    throw Error('Unrecognized transition length entered.');
  },
  addAudioMetadata: function(inputText,outputFilename,outputVoice) {
    if (!inputText || !outputFilename || typeof inputText !== 'string' | typeof outputFilename !== 'string') {
      throw Error('Invalid input text or output filename.');
    }
    this.audioMetadata.push(
      {
        text: inputText,
        filename: this.videoAssetsPath + outputFilename + '.aiff',
        voice: outputVoice || 'karen'
      }
    );
  },
  generateTitle: function(titlesPath) {
    if (!titlesPath) {
      throw Error('Unable to locate titles JSON data file.');
    }
    let data = {};
    try {
      data = JSON.parse(fs.readFileSync(titlesPath));
    }
    catch (error) {
      console.log(error);
      throw Error('Error parsing titles JSON data.');
    }
    let title = {};
    title.raw = '';
    title.singularKeywords = data.singularKeywords;
    title.pluralKeywords = data.pluralKeywords;
    let singularKeywords = false;
    let singularPrefix = false;
    let singularSuffix = false;
    let pluralKeywords = false;
    let pluralPrefix = false;
    let pluralSuffix = false;
    if (data.singularKeywords.length > 0 && data.pluralKeywords.length === 0) {
      singularKeywords = true;
    }
    else if (data.singularKeywords.length > 0) {
      singularKeywords = rand(true,false);
    }
    pluralKeywords = data.pluralKeywords.length > 0 && !singularKeywords;
    if (singularKeywords && data.singularPrefix.length > 0 && (data.singularSuffix.length === 0 || data.requiresPrefix)) {
      singularPrefix = true;
    }
    else if (singularKeywords && data.singularPrefix.length > 0) {
      singularPrefix = rand(true,false);
    }
    if (singularKeywords && data.singularSuffix.length > 0 && (!singularPrefix || data.requiresSuffix)) {
      singularSuffix = true;
    }
    if (pluralKeywords && data.pluralPrefix.length > 0 && (data.pluralSuffix.length === 0 || data.requiresPrefix)) {
      pluralPrefix = true;
    }
    else if (pluralKeywords && data.pluralPrefix.length > 0) {
      pluralPrefix = rand(true,false);
    }
    if (pluralKeywords && data.pluralSuffix.length > 0 && (!pluralPrefix || data.requiresSuffix)) {
      pluralSuffix = true;
    }
    if (singularPrefix) {
      title.raw += rand(...data.singularPrefix) + ' ';
    }
    if (pluralPrefix) {
      title.raw += rand(...data.pluralPrefix) + ' ';
    }
    if (singularKeywords) {
      title.raw += rand(...data.singularKeywords);
    }
    if (pluralKeywords) {
      title.raw += rand(...data.pluralKeywords);
    }
    if (singularSuffix) {
      title.raw += ' ' + rand(...data.singularSuffix);
    }
    if (pluralSuffix) {
      title.raw += ' ' + rand(...data.pluralSuffix);
    }
    title.raw = title.raw.replace(/(?:^|\s)\S/g, word => word.toUpperCase());
    if (title.raw.length < 30) {
      title.short = title.raw;
    }
    else if (singularKeywords) {
      title.short = rand(...data.singularKeywords).replace(/(?:^|\s)\S/g, word => word.toUpperCase());
    }
    else if (pluralKeywords) {
      title.short = rand(...data.pluralKeywords).replace(/(?:^|\s)\S/g, word => word.toUpperCase());
    }
    return title;
  },
  projectsXML: function(videoSlides) {
    if (!videoSlides || !videoSlides.length || !videoSlides[0].clips.length) {
      throw Error('Unable to generate projects XML without video metadata.');
    }
    let xml = {
      projects: '',
      references: ''
    };
    for (let p = 0; p < videoSlides.length; p++) {
      let projectXML = '';
      let title = this.generateTitle(videoSlides[p].title);
      let projectName = title.raw;
      if (this.uploadMetadata[projectName]) {
        continue;
      }
      projectXML +=
      `<project name="${projectName}">
      <sequence duration="INSERT_PROJECT_DURATION_HERE" format="${this.projectFormatID}" renderColorSpace="Rec. 709" tcStart="0s" audioLayout="stereo" audioRate="48k">
      <spine>
      `;
      for (let s = 0; s < videoSlides[p].clips.length; s++) {
        let videoText = '';
        let audioText = '';
        let videoImage = '';
        let videoDuration = 5;
        if (videoSlides[p].clips[s].text && videoSlides[p].clips[s].text.length < 30) {
          videoText = videoSlides[p].clips[s].text;
        }
        if (videoSlides[p].clips[s].audio) {
          audioText = videoSlides[p].clips[s].audio;
          videoDuration = this.calculateVideoLengthFromText(audioText);
        }
        if (videoSlides[p].clips[s].image) {
          videoImage = videoSlides[p].clips[s].image;
        }
        let clip;
        if (s === 0) {
          clip = this.makeClip(videoImage,audioText,videoText,videoDuration,0);
        }
        else {
          let randomVideoImage, randomAudioText, randomVideoText;
          if (!videoImage) {
            randomVideoText = videoText;
          }
          else {
            randomVideoText = rand(videoText,'');
          }
          if (!randomVideoText) {
            randomVideoImage = videoImage;
          }
          else {
            randomVideoImage = rand(videoImage,'','');
          }
          randomAudioText = rand(audioText,'');
          clip = this.makeClip(randomVideoImage,randomAudioText,randomVideoText,videoDuration,0);
        }
        xml.references += clip.xml;
        if (this.currentProjectDuration === 0) {
          let music = this.randomMusicTrack();
          projectXML +=
          `<ref-clip name="${'clip-' + clip.reference}" offset="${this.currentProjectDuration + 's'}" ref="${clip.reference}" duration="${videoDuration + 's'}">
          <asset-clip name="${music.name}" lane="-1" offset="0s" ref="${music.id}" duration="INSERT_PROJECT_DURATION_HERE" audioRole="music" format="${this.audioFormatID}">
          <adjust-volume amount="-12dB"/>
          </asset-clip>
          </ref-clip>
          `;
        }
        else {
          projectXML +=
          `<ref-clip name="${'clip-' + clip.reference}" offset="${this.currentProjectDuration + 's'}" ref="${clip.reference}" duration="${videoDuration + 's'}"/>
          `;
        }
        this.currentProjectDuration += videoDuration;
      }
      projectXML +=
      `</spine>
      </sequence>
      </project>
      `;
      xml.projects += projectXML.replace(/INSERT_PROJECT_DURATION_HERE/g, this.currentProjectDuration + 's').replace(/\n\s*/g,'\n');
      this.currentProjectDuration = 0;
      let rawKeywords = title.singularKeywords.concat(title.pluralKeywords);
      let randomKeywords = [];
      let keywordList = '';
      for (let i = 0; i < rawKeywords.length; i++) {
        let flip = rand(true,false);
        if (flip) {
          randomKeywords.push(rawKeywords[i]);
        }
      }
      if (randomKeywords.length > 0) {
        keywordList = randomKeywords.join(', ');
      }
      let uploadObj = {
        "file": this.videoAssetsPath + projectName + '.mp4',
        "title": projectName,
        "description": videoSlides[p].description,
        "keywords": keywordList,
        "category": videoSlides[p].category,
        "privacy": videoSlides[p].privacy
      };
      this.uploadMetadata[projectName] = uploadObj;
    }
    return xml;
  },
  xml: function(videoSlides,name) {
    if (!videoSlides || !videoSlides.length || !videoSlides[0].clips.length) {
      throw Error('Unable to generate projects XML without video metadata.');
    }
    let file = '';
    let clips = this.projectsXML(videoSlides);
    file += this.openingTags();
    file += this.assetsXML();
    file += clips.references;
    file += this.middleTags(name);
    file += clips.projects;
    file += this.closingTags(name);
    file = file.replace(/\n\s*/g,'\n');
    this.xmlFile = file;
    return file;
  },
  write: function(xmlFilename,audioMetadataFilename,uploadMetadataFilename) {
    if (!this.xmlFile || !this.audioMetadata || !this.uploadMetadata) {
      throw Error('Unable to write to file without existing data.');
    }
    if (!xmlFilename || typeof xmlFilename !== 'string') {
      xmlFilename = 'projects.fcpxml';
    }
    if (!audioMetadataFilename || typeof audioMetadataFilename !== 'string') {
      audioMetadataFilename = 'audio-metadata.json';
    }
    if (!uploadMetadataFilename || typeof uploadMetadataFilename !== 'string') {
      uploadMetadataFilename = 'upload-metadata.json';
    }
    try {
      fs.writeFileSync(this.videoAssetsPath + xmlFilename,this.xmlFile,'utf8');
      fs.writeFileSync(this.videoAssetsPath + audioMetadataFilename,JSON.stringify(this.audioMetadata));
      fs.writeFileSync(this.videoAssetsPath + uploadMetadataFilename,JSON.stringify(this.uploadMetadata));
    }
    catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

};
