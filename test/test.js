const expect = require('chai').expect;
const fcp = require('../index');
const fs = require('fs');

describe('FCPXML', () => {

  it('should return an object', () => {
    expect(fcp).to.be.an('object');
    expect(fcp).to.not.be.undefined;
  });

  it('video slide template should have correct properties', () => {
    expect(fcp.slideTemplate).to.be.an('array');
    expect(fcp.slideTemplate[0]).to.be.an('object');
    expect(fcp.slideTemplate[0]).to.have.property('title');
    expect(fcp.slideTemplate[0]).to.have.property('description');
    expect(fcp.slideTemplate[0]).to.have.property('category');
    expect(fcp.slideTemplate[0]).to.have.property('privacy');
    expect(fcp.slideTemplate[0]).to.have.property('clips');
    expect(fcp.slideTemplate[0]).to.have.property('keywords');
    expect(fcp.slideTemplate[0].clips[0]).to.have.property('text');
    expect(fcp.slideTemplate[0].clips[0]).to.have.property('audio');
    expect(fcp.slideTemplate[0].clips[0]).to.have.property('image');
    expect(fcp.slideTemplate[0].clips[0]).to.have.property('keyword');
    expect(fcp.slideTemplate[0].clips[0]).to.have.property('template');
  });

  it('transitions should return correct value template strings', () => {
    fcp.init();
    let transition = fcp.CrossDissolve('5s','5s');
    let result =
    `<transition name="Cross Dissolve" offset="5s" duration="5s">
    <filter-video ref="r3" name="Cross Dissolve">
    <param name="Look" key="1" value="11 (Video)"/>
    <param name="Amount" key="2" value="50"/>
    <param name="Ease" key="50" value="2 (In &amp; Out)"/>
    <param name="Ease Amount" key="51" value="0"/>
    </filter-video>
    <filter-audio ref="r4" name="Audio Crossfade"/>
    </transition>
    `;
    expect(result).to.equal(transition);
  });

  it('images should return correct value template strings', () => {
    fcp.init();
    let image = fcp.InCenter('My Image','r28','5s','5s');
    let result =
    `<video name="My Image" offset="5s" ref="r28" duration="5s" start="3600s">
    <adjust-crop mode="pan">
    <pan-rect top="0" left="0" bottom="0" right="0"/>
    <pan-rect top="7.29342" left="13.2237" bottom="7.70658" right="13.443"/>
    </adjust-crop>
    </video>
    `;
    expect(result).to.equal(image);
  });

  it('random video transition should return a transition', () => {
    fcp.init();
    let transition = fcp.randomVideoTransition();
    let check = transition.includes('<transition name=');
    expect(transition).to.be.a('string');
    expect(check).to.equal(true);
  });

  it('random title transition should return a transition', () => {
    fcp.init();
    let transition = fcp.randomTitleTransition();
    let check = transition.includes('<transition name=');
    expect(transition).to.be.a('string');
    expect(check).to.equal(true);
  });

  it('random image pan should return an image', () => {
    fcp.init();
    let image = fcp.randomImagePan();
    let check = image.includes('<video name=');
    expect(image).to.be.a('string');
    expect(check).to.equal(true);
  });

  it('random music track should return an object with correct properties', () => {
    fcp.init();
    let music = fcp.randomMusicTrack();
    expect(music).to.be.an('object');
    expect(music).to.have.property('id');
    expect(music).to.have.property('name');
    expect(music.name).to.be.a('string');
    expect(music.id).to.be.a('string');
  });

  it('should be able to find video project file path', () => {
    fcp.init();
    expect(fs.existsSync(fcp.projectPath)).to.equal(true);
  });

  it('static markup tags should return correct values', () => {
    fcp.init();
    let refs = fcp.assetsXML();
    let opening = fcp.openingTags();
    let middle = fcp.middleTags();
    let closing = fcp.closingTags();
    let openingResult = `<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE fcpxml>
    <fcpxml version="1.6">
    <resources>
    `;
    let middleResult = `</resources>
    <library>
    <event name="Projects">
    `;
    let closingResult = `</event>
    <smart-collection name="Projects" match="all">
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
    let refsResult =
    `<format id="${fcp.projectFormatID}" name="FFVideoFormat720p24" frameDuration="100/2400s" width="1280" height="720"/>
    <effect id="${fcp.whitesID}" name="Whites" uid=".../Generators.localized/Solids.localized/Whites.localized/Whites.motn"/>
    <effect id="${fcp.crossDissolveID}" name="Cross Dissolve" uid="FxPlug:4731E73A-8DAC-4113-9A30-AE85B1761265"/>
    <effect id="${fcp.audioCrossfadeID}" name="Audio Crossfade" uid="FFAudioTransition"/>
    <effect id="${fcp.basicTitleID}" name="Basic Title" uid=".../Titles.localized/Bumper:Opener.localized/Basic Title.localized/Basic Title.moti"/>
    <effect id="${fcp.clotheslineID}" name="Clothesline" uid=".../Transitions.localized/Movements.localized/Clothesline.localized/Clothesline.motr"/>
    <effect id="${fcp.dropInID}" name="Drop In" uid=".../Transitions.localized/Movements.localized/Drop In.localized/Drop In.motr"/>
    <effect id="${fcp.pushID}" name="Push" uid=".../Transitions.localized/Movements.localized/Push.localized/Push.motr"/>
    <effect id="${fcp.rotateID}" name="Rotate" uid=".../Transitions.localized/Movements.localized/Rotate.localized/Rotate.motr"/>
    <effect id="${fcp.scaleID}" name="Scale" uid=".../Transitions.localized/Movements.localized/Scale.localized/Scale.motr"/>
    <effect id="${fcp.slideID}" name="Slide" uid="FxPlug:6AAB0D54-FCD8-4EBD-A62D-D352A5ED1648"/>
    <effect id="${fcp.spinID}" name="Spin" uid="FxPlug:196B9DB2-28FD-420F-9BA1-3F0E9EEBBAAA"/>
    <format id="${fcp.imageFormatID}" name="FFVideoFormatRateUndefined" width="1280" height="720"/>
    <format id="${fcp.audioFormatID}" name="FFVideoFormatRateUndefined"/>
    <effect id="${fcp.swapID}" name="Swap" uid="FxPlug:ED30AF7F-E5F2-4E1D-9ED8-74F6F055887F"/>
    <effect id="${fcp.swingID}" name="Swing" uid=".../Transitions.localized/Movements.localized/Swing.localized/Swing.motr"/>
    <asset id="${fcp.music1}" name="Bright_Future" uid="D4B213A2F40498A916009A4E8667A3B7" src="${"file://" + fcp.projectPath + "Bright_Future.mp3"}" start="0s" duration="7717248/44100s" hasAudio="1" audioSources="1" audioChannels="2" audioRate="44100"/>
    <asset id="${fcp.music2}" name="Bring_it_up" uid="96A15E699FA10811C40F093946DF3F52" src="${"file://" + fcp.projectPath + "Bring_it_up.mp3"}" start="0s" duration="7853184/44100s" hasAudio="1" audioSources="1" audioChannels="2" audioRate="44100"/>
    <asset id="${fcp.music3}" name="Don_t_Look" uid="BD80E52FB35E00EBA743416B86CD602B" src="${"file://" + fcp.projectPath + "Don_t_Look.mp3"}" start="0s" duration="11718144/44100s" hasAudio="1" audioSources="1" audioChannels="2" audioRate="44100"/>
    <asset id="${fcp.music4}" name="Hollywood_High" uid="50F80E752E96DABCDC93AA2759893FBA" src="${"file://" + fcp.projectPath + "Hollywood_High.mp3"}" start="0s" duration="8574336/44100s" hasAudio="1" audioSources="1" audioChannels="2" audioRate="44100"/>
    <asset id="${fcp.music5}" name="I_Love_You" uid="D51891EBABC0F1891335E1DDF0E12312" src="${"file://" + fcp.projectPath + "I_Love_You.mp3"}" start="0s" duration="8756352/44100s" hasAudio="1" audioSources="1" audioChannels="2" audioRate="44100"/>
    <asset id="${fcp.music6}" name="Over_Time" uid="540A25F6BF679E43DFFBA148EFFB5C2A" src="${"file://" + fcp.projectPath + "Over_Time.mp3"}" start="0s" duration="8021376/44100s" hasAudio="1" audioSources="1" audioChannels="2" audioRate="44100"/>
    <asset id="${fcp.music7}" name="Reasons_to_Smile" uid="8810E3402684878ECE8B03C292F5A129" src="${"file://" + fcp.projectPath + "Reasons_to_Smile.mp3"}" start="0s" duration="8464896/44100s" hasAudio="1" audioSources="1" audioChannels="2" audioRate="44100"/>
    <asset id="${fcp.music8}" name="Sunday_Plans" uid="D70E13F2EB1C1D25C5981C5ACC634156" src="${"file://" + fcp.projectPath + "Sunday_Plans.mp3"}" start="0s" duration="7498368/44100s" hasAudio="1" audioSources="1" audioChannels="2" audioRate="44100"/>
    <asset id="${fcp.music9}" name="Undeniable" uid="64880D3F07110BD686ED7F8650283C9C" src="${"file://" + fcp.projectPath + "Undeniable.mp3"}" start="0s" duration="8777088/44100s" hasAudio="1" audioSources="1" audioChannels="2" audioRate="44100"/>
    <asset id="${fcp.music10}" name="Venice_Beach" uid="C4DB24601F715BBCB1B98E8FEBBB99D9" src="${"file://" + fcp.projectPath + "Venice_Beach.mp3"}" start="0s" duration="7805952/44100s" hasAudio="1" audioSources="1" audioChannels="2" audioRate="44100"/>
    <asset id="${fcp.music11}" name="Where_I_am_From" uid="085466F06BDA75E28D0F767E193E0FDE" src="${"file://" + fcp.projectPath + "Where_I_am_From.mp3"}" start="0s" duration="9489024/44100s" hasAudio="1" audioSources="1" audioChannels="2" audioRate="44100"/>
    `;
    expect(opening).to.equal(openingResult);
    expect(middle).to.equal(middleResult);
    expect(closing).to.equal(closingResult);
    expect(refs).to.equal(refsResult);
  });

  it('calculate video length should return correct length or default of 5', () => {
    fcp.init();
    expect(fcp.calculateVideoLengthFromText('sample')).to.equal(5);
    expect(fcp.calculateVideoLengthFromText('sample line of text')).to.equal(2);
  });

  it('calculate transition length should return correct offset string', () => {
    fcp.init();
    expect(fcp.calculateTransitionStartFromLength(10,'600/2400s')).to.equal('23400/2400s');
    expect(fcp.calculateTransitionStartFromLength(10,'1200/2400s')).to.equal('22800/2400s');
    expect(()=>{fcp.calculateTransitionStartFromLength(10,'1300/2400s')}).to.throw();
  });

  it('text to speech should add audio metadata to file', () => {
    fcp.init();
    fcp.addAudioMetadata('This is a text sample.','output-file');
    expect(fcp.audioMetadata.length).to.equal(1);
    expect(fcp.audioMetadata[0].text).to.equal('This is a text sample.');
    expect(fcp.audioMetadata[0].filename).to.equal(fcp.projectPath + 'output-file.aiff');
    expect(fcp.audioMetadata[0].voice).to.equal('karen');
  });

  it('make clip should return object with correct xml and reference', () => {
    let clip;
    fcp.init();
    clip = fcp.makeClip({text: 'Test Title'},5,0);
    expect(clip).to.be.an('object');
    expect(clip).to.have.property('xml');
    expect(clip).to.have.property('reference');
    expect(clip.reference).to.equal('r28');
    expect(fcp.currentReferenceID).to.equal(29);
    expect(()=>{fcp.makeClip({},5)}).to.throw();
  });

  it('projects xml should return correct xml string', () => {
    fcp.init();
    let slides = [
      {
        title: 'My video',
        description: 'A test description.',
        category: '0',
        privacy: 'private',
        keywords: ['html','css','javascript'],
        clips: [
          {
            text: 'Some text...',
            audio: 'A sample voice over.',
            image: null,
            keyword: '',
            template: ''
          },
          {
            text: 'Some text...',
            audio: 'A sample voice over.',
            image: null,
            keyword: '',
            template: ''
          }
        ]
      },
    ];
    let xml = fcp.projectsXML(slides);
    expect(xml).to.be.an('object');
    expect(xml).to.have.property('projects');
    expect(xml).to.have.property('references');
    expect(()=>{fcp.projectsXML([])}).to.throw();
  });

  it('xml should return correctly combine all xml components and write to file', () => {
    fcp.init('/Users/brentmccoy/Apps/node-modules/bmjs-fcpxml/assets/my-project/','','ava');
    let slides = [
      {
        title: 'My video',
        description: 'A test description.',
        category: '22',
        privacy: 'private',
        keywords: ['html','css','javascript'],
        clips: [
          {
            text: 'Some text...',
            audio: 'Here is some text.',
            image: {filename: 'sample-img.png'},
            keyword: 'dog',
            template: ''
          },
          {
            text: 'Some more text...',
            audio: 'This is another line of text.',
            image: null,
            keyword: '',
            template: ''
          },
          {
            text: '',
            audio: '',
            image: {filename: 'sample-img.png'},
            keyword: 'dog',
            template: ''
          },
        ]
      }
    ];
    let result = fcp.xml(slides,'My Project');
    expect(result).to.be.a('string');
    expect(fcp.xmlFile).to.equal(result);
    expect(()=>{fcp.xml()}).to.throw();
    fcp.write();
  });

  it('set output voice should correctly set audio voice', () => {
    fcp.init();
    expect(fcp.outputVoice).to.equal('karen');
    fcp.setVoice('ava');
    expect(fcp.outputVoice).to.equal('ava');
  });

});
