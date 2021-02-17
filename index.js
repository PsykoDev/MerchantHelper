module.exports = function MerchantHelper(mod) {
  const Message = require("./lib");
  const MSG = new Message(mod);

  let mobid = [],
    boss = null,
    bossName = null,
    sysMsg = null,
    npcID = null,
    bossHunting = 0,
    bossTemplate = 0,
    currentChannel = 0;

  mod.command.add(["mh"], (arg) => {
    if (!arg) {
      mod.settings.enabled = !mod.settings.enabled;
      console.log("MerchantHelper: " + (mod.settings.enabled ? "on" : "off"));
      if (!mod.settings.enabled) {
        for (let i of mobid) {
          despawnItem(i);
        }
      }
    } else {
      switch (arg) {
        case "alert":
          mod.settings.alerted = !mod.settings.alerted;
          console.log("alert " + (mod.settings.alerted ? "on" : "off"));
          break;
        case "notice":
          mod.settings.notice = !mod.settings.notice;
          console.log("notice " + (mod.settings.notice ? "on" : "off"));
          break;
        case "party":
          mod.settings.party = !mod.settings.party;
          console.log("party " + (party ? "on" : "off"));
          break;
        case "guild":
          mod.settings.guild = !mod.settings.guild;
          console.log("guild " + (guild ? "on" : "off"));
          MSG.guild("mh guild is: " + (guild ? "on" : "off"));
          break;
        case "message":
          mod.settings.messager = !mod.settings.messager;
          console.log("message " + (mod.settings.messager ? "on" : "off"));
          break;
        case "mark":
          mod.settings.marker = !mod.settings.marker;
          console.log("marker " + (mod.settings.marker ? "on" : "off"));
          break;
        case "clear":
          console.log("MerchantHelper " + TIP("cleared Marker"));
          for (let i of mobid) {
            despawnItem(i);
          }
          break;
        default:
          console.log("MerchantHelper " + "wrong parameter!");
          break;
      }
    }
  });

  mod.hook("S_CHAT", 3, (event) => {
    let rawMessage = event.message;
    let message = rawMessage.replace("<font></font>", "").replace(/&.{3}/g, "");

    if (event.channel === 2 && message === "@mh") {
      stat();
    } else if (event.channel === 2 && message === "<FONT>@mh</FONT>") {
      stat();
    }

    if (event.channel === 2 && message === "@mh on") {
      MSG.guild("MerchantHelper: " + (mod.settings.enabled = true));
    } else if (event.channel === 2 && message === "<FONT>@mh on</FONT>") {
      MSG.guild("MerchantHelper: " + (mod.settings.enabled = true));
    }

    if (event.channel === 2 && message === "@mh off") {
      MSG.guild("MerchantHelper: " + (mod.settings.enabled = false));
    } else if (event.channel === 2 && message === "<FONT>@mh off</FONT>") {
      MSG.guild("MerchantHelper: " + (mod.settings.enabled = false));
    }
  });

  function stat() {
    MSG.guild("------------ BOSS ------------");
    for (const i of mod.settings.bosses) {
      if (i.logTime == undefined) continue;
      if (![5001, 501, 4001].includes(i.templateId)) continue;
      var nextTime = i.logTime + 5 * 60 * 60 * 1000;
      if (i.logTime == 0) {
        MSG.guild(i.name + "Rien");
      } else if (Date.now() < nextTime) {
        MSG.guild(i.name + " Prochain  " + getTime(nextTime));
      } else {
        MSG.guild(i.name + " Dernier  " + getTime(nextTime));
      }
    }
    MSG.guild("------------ Mystery Merchant ------------");
    for (const j of mod.settings.bosses) {
      if (j.logTime == undefined) continue;
      if (![63, 72, 84, 183].includes(j.huntingZoneId)) continue;
      var nextTime = j.logTime + 24 * 60 * 60 * 1000;
      if (j.logTime == 0) {
        MSG.guild(j.name + "Rien");
      } else if (Date.now() < nextTime) {
        MSG.guild(j.name + " Prochain " + getTime(nextTime));
      } else {
        MSG.guild(j.name + " Dernier " + getTime(nextTime));
      }
    }
  }

  mod.game.me.on("change_zone", (zone, quick) => {
    mobid = [];
  });

  mod.hook("S_CURRENT_CHANNEL", 2, (event) => {
    currentChannel = Number(event.channel);
  });

  mod.hook("S_SPAWN_NPC", 12, (event) => {
    if (!mod.settings.enabled) return;

    whichBoss(event.huntingZoneId, event.templateId);
    if (boss) {
      if (mod.settings.marker) {
        spawnItem(event.gameId, event.loc);
        mobid.push(event.gameId);
      }
      if (mod.settings.alerted) {
        MSG.alert("trouver  " + boss.name, 44);
      }
      if (mod.settings.party) {
        mod.send("C_CHAT", 1, {
          channel: 21,
          message: currentChannel + "trouver " + boss.name,
        });
      } else if (mod.settings.notice) {
        MSG.raids("trouver  " + boss.name);
      }
    }

    if (event.walkSpeed != 240) return;

    switch (event.templateId) {
      case 5001: // Ortan
        event.shapeId = 303730;
        event.huntingZoneId = 434;
        event.templateId = 7000;
        load(event);
        return true;
      case 501: // Hazard
        event.shapeId = 303740;
        event.huntingZoneId = 777;
        event.templateId = 77730;
        load(event);
        return true;
      case 4001: // Cerrus
        event.shapeId = 303750;
        event.huntingZoneId = 994;
        event.templateId = 1000;
        load(event);
        return true;
    }
  });

  mod.hook("S_DESPAWN_NPC", 3, { order: -100 }, (event) => {
    if (!mobid.includes(event.gameId)) return;

    whichBoss(event.huntingZoneId, event.templateId);
    // if (boss) {
    // if (event.type == 5) {
    // if (mod.settings.alerted) {
    // MSG.alert((boss.name + " found "), 44)
    // }
    // if (mod.settings.notice) {
    // MSG.raids(boss.name + " found ")
    // }
    // } else if (event.type == 1) {
    // if (mod.settings.alerted) {
    // MSG.alert((boss.name + " ...Out of range"), 44)
    // }
    // if (mod.settings.notice) {
    // MSG.raids(boss.name + " ...Out of range")
    // }
    // }
    // }
    despawnItem(event.gameId);
    mobid.splice(mobid.indexOf(event.gameId), 1);
  });

  mod.hook("S_NOTIFY_GUILD_QUEST_URGENT", 1, (event) => {
    switch (event.quest) {
      case "@GuildQuest:10005001":
        whichBoss(event.zoneId, 2001);
        break;
      case "@GuildQuest:10006001":
        whichBoss(event.zoneId, 2002);
        break;
      case "@GuildQuest:10007001":
        whichBoss(event.zoneId, 2003);
        break;
    }

    if (boss && event.type == 0) {
      console.log("Bam de guild" + " " + boss.name);
      MSG.guild("Bam de guild " + " " + boss.name);
    }

    if (boss && event.type == 1) {
      console.log("Mort" + " " + boss.name);
      MSG.guild("Mort" + " " + boss.name);
    }
  });

  mod.hook("S_SYSTEM_MESSAGE", 1, (event) => {
    if (!mod.settings.enabled || !mod.settings.messager) return;

    sysMsg = mod.parseSystemMessage(event.message);
    switch (sysMsg.id) {
      case "SMT_FIELDBOSS_APPEAR":
        getBossMsg(sysMsg.tokens.npcName);
        whichBoss(bossHunting, bossTemplate);
        if (boss) {
          MSG.guild("WorldBoss" + " " + boss.name);
          console.log("WorldBoss" + " " + boss.name);
        }
        break;
      case "SMT_FIELDBOSS_DIE_GUILD":
      case "SMT_FIELDBOSS_DIE_NOGUILD":
        getBossMsg(sysMsg.tokens.npcname);
        whichBoss(bossHunting, bossTemplate);
        if (boss) {
          var nextTime = Date.now() + 5 * 60 * 60 * 1000;
          MSG.guild(boss.name + " Prochain le" + " " + getTime(nextTime));
          console.log(boss.name + " Prochain le" + " " + getTime(nextTime));
          saveTime();
        }
        break;

      case "SMT_WORLDSPAWN_NOTIFY_SPAWN":
        getBossMsg(sysMsg.tokens.npcName);
        whichBoss(bossHunting, bossTemplate);
        if (boss) {
          if ([1276, 1284].includes(bossTemplate)) {
            /*MSG.guild("apparaît"+" " + boss.name )*/
          }
        }
        if (boss) {
          MSG.guild("apparaît" + " " + boss.name);
          console.log("apparaît" + " " + boss.name);
          saveTime();
        }
        break;
      case "SMT_WORLDSPAWN_NOTIFY_DESPAWN":
        getBossMsg(sysMsg.tokens.npcName);
        whichBoss(bossHunting, bossTemplate);
        if (boss) {
          //console.log(boss.name) + MSG.YEL(" Left")};
          MSG.guild("disparaît" + " " + boss.name);
        }
        break;
      default:
        break;
    }
  });

  function getBossMsg(id) {
    npcID = id.match(/\d+/gi);
    bossHunting = parseInt(npcID[0]);
    bossTemplate = parseInt(npcID[1]);
  }

  function whichBoss(h_ID, t_ID) {
    if (
      mod.settings.bosses.find(
        (b) => b.huntingZoneId == h_ID && b.templateId == t_ID
      )
    ) {
      boss = mod.settings.bosses.find(
        (b) => b.huntingZoneId == h_ID && b.templateId == t_ID
      );
    } else {
      boss = null;
    }
  }

  function saveTime() {
    for (let i = 0; i < mod.settings.bosses.length; i++) {
      if (mod.settings.bosses[i].logTime == undefined) continue;
      if (mod.settings.bosses[i].huntingZoneId != bossHunting) continue;
      if (mod.settings.bosses[i].templateId != bossTemplate) continue;

      mod.settings.bosses[i].logTime = Date.now();
    }
  }

  function getTime(thisTime) {
    var Time = new Date(thisTime);
    return (
      add_0(Time.getDate()) +
      "/" +
      add_0(Time.getMonth() + 1) +
      " " +
      add_0(Time.getHours()) +
      ":" +
      add_0(Time.getMinutes())
    );
  }

  function add_0(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  function spawnItem(gameId, loc) {
    mod.send("S_SPAWN_DROPITEM", 9, {
      gameId: gameId * 10n,
      loc: loc,
      item: mod.settings.itemId,
      amount: 1,
      expiry: 999999,
      owners: [{}],
    });
  }

  function despawnItem(gameId) {
    mod.send("S_DESPAWN_DROPITEM", 4, {
      gameId: gameId * 10n,
    });
  }
};
