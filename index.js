module.exports = function MerchantHelper(mod) {
	// const notifier = mod.require ? mod.require.notifier : require('tera-notifier')(mod)
	const Message = require('./lib')
	const MSG = new Message(mod)
	
	let mobid = [],
		boss = null,
		bossName = null,
		sysMsg = null,
		npcID = null,
		bossHunting = 0,
		bossTemplate = 0,
		
		party = false,
		guild = false,
		currentChannel = 0
	
	mod.command.add(["mh"], (arg) => {
		if (!arg) {
			mod.settings.enabled = !mod.settings.enabled
			MSG.chat("MerchantHelper: " + (mod.settings.enabled ? MSG.BLU("On") : MSG.YEL("Off")))
			if (!mod.settings.enabled) {
				for (let i of mobid) {
					despawnItem(i)
				}
			}
		} else {
			switch (arg) {
				case "alert":
					mod.settings.alerted = !mod.settings.alerted
					MSG.chat("alert " + (mod.settings.alerted ? MSG.BLU("on") : MSG.YEL("off")))
					break
				case "notice":
					mod.settings.notice = !mod.settings.notice
					MSG.chat("notice " + (mod.settings.notice ? MSG.BLU("on") : MSG.YEL("off")))
					break
				case "party":
					party = !party
					MSG.chat("party " + (party ? MSG.BLU("on") : MSG.YEL("off")))
					break
				case "guild":
					guild = !guild
					MSG.chat("guild " + (guild ? MSG.BLU("on") : MSG.YEL("off")))
					MSG.guild("guild " + (guild ? MSG.BLU("on") : MSG.YEL("off")))
					break
				case "message":
					mod.settings.messager = !mod.settings.messager
					MSG.chat("message " + (mod.settings.messager ? MSG.BLU("on") : MSG.YEL("off")))
					break
				case "mark":
					mod.settings.marker = !mod.settings.marker
					MSG.chat("marker " + (mod.settings.marker ? MSG.BLU("on") : MSG.YEL("off")))
					break
				case "clear":
					MSG.chat("MerchantHelper " + TIP("cleared Marker"))
					for (let i of mobid) {
						despawnItem(i)
					}
					break
				case "status":
					MSG.chat("------------ BOSS ------------")
					for (const i of mod.settings.bosses) {
						if (i.logTime == undefined) continue
						if (![5001, 501, 4001].includes(i.templateId)) continue
						
						var nextTime = i.logTime + 5*60*60*1000
						if (i.logTime == 0) {
							MSG.chat(MSG.RED(i.name) + MSG.YEL("nothing tracked"))
						} else if (Date.now() < nextTime) {
							MSG.chat(MSG.RED(i.name) + " next  " + MSG.TIP(getTime(nextTime)))
						} else {
							MSG.chat(MSG.RED(i.name) + " last  " + MSG.GRY(getTime(nextTime)))
						}
					}
					// break
				// case "merchant":
					MSG.chat("------------ Mystery Merchant ------------")
					for (const j of mod.settings.bosses) {
						if (j.logTime == undefined) continue
						if (![63, 72, 84, 183].includes(j.huntingZoneId)) continue
						
						var nextTime = j.logTime + 24*60*60*1000
						if (j.logTime == 0) {
							MSG.chat(MSG.PIK(j.name) + MSG.YEL("nothing tracked"))
						} else if (Date.now() < nextTime) {
							MSG.chat(MSG.PIK(j.name) + " next " + MSG.TIP(getTime(nextTime)))
						} else {
							MSG.chat(MSG.PIK(j.name) + " last " + MSG.GRY(getTime(nextTime)))
						}
					}
					break
				default:
					MSG.chat("MerchantHelper " + MSG.RED("wrong parameter!"))
					break
			}
		}
	})
	
	mod.game.me.on('change_zone', (zone, quick) => {
		mobid = []
	})
	
	mod.hook('S_CURRENT_CHANNEL', 2, (event) => {
		currentChannel = Number(event.channel)
	})
	
	mod.hook('S_SPAWN_NPC', 11, (event) => {
		if (!mod.settings.enabled) return
		
		whichBoss(event.huntingZoneId, event.templateId)
		if (boss) {
			if (mod.settings.marker) {
				spawnItem(event.gameId, event.loc)
				mobid.push(event.gameId)
			}
			if (mod.settings.alerted) {
				MSG.alert(("found  " + boss.name), 44)
			}
			if (party) {
				mod.send('C_CHAT', 1, {
					channel: 21,
					message: (currentChannel + "found " + boss.name)
				})
			} else if (mod.settings.notice) {
				MSG.raids("found  " + boss.name)
			}
		}
		
		if (event.walkSpeed != 240) return
		
		switch (event.templateId) {
			case 5001: // Ortan
				event.shapeId = 303730
				event.huntingZoneId = 434
				event.templateId = 7000
				load(event)
				return true
			case 501:  // Hazard
				event.shapeId = 303740
				event.huntingZoneId = 777
				event.templateId = 77730
				load(event)
				return true
			case 4001: // Cerrus
				event.shapeId = 303750
				event.huntingZoneId = 994
				event.templateId = 1000
				load(event)
				return true
		}
	})
	
	mod.hook('S_DESPAWN_NPC', 3, {order: -100}, (event) => {
		if (!mobid.includes(event.gameId)) return
		
		whichBoss(event.huntingZoneId, event.templateId)
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
		despawnItem(event.gameId)
		mobid.splice(mobid.indexOf(event.gameId), 1)
	})
	
	mod.hook('S_NOTIFY_GUILD_QUEST_URGENT', 1, (event) => {
		switch (event.quest) {
			case "@GuildQuest:10005001":
				whichBoss(event.zoneId, 2001)
				break
			case "@GuildQuest:10006001":
				whichBoss(event.zoneId, 2002)
				break
			case "@GuildQuest:10007001":
				whichBoss(event.zoneId, 2003)
				break
		}
		
		if (boss && event.type == 0) {
			MSG.chat(MSG.BLU("Guild Boss ") + MSG.RED(boss.name))
			MSG.guild("Guild boss appear" + boss.name)
			notificationafk("Guild Boss " + boss.name)
		}
		
		if (boss && event.type == 1) {
			MSG.chat(MSG.BLU("Refreshed ") + MSG.TIP(boss.name))
			notificationafk("Refreshed " + boss.name)
		}
	})
	
	mod.hook('S_SYSTEM_MESSAGE', 1, (event) => {
		if (!mod.settings.enabled || !mod.settings.messager) return
		
		sysMsg = mod.parseSystemMessage(event.message)
		switch (sysMsg.id) {
			case 'SMT_FIELDBOSS_APPEAR':
				getBossMsg(sysMsg.tokens.npcName)
				whichBoss(bossHunting, bossTemplate)
				if (boss) {
					MSG.chat(MSG.BLU("APPEAR ") + MSG.RED(boss.name))
					notificationafk("APPEAR " + boss.name)
				}
				break
			case 'SMT_FIELDBOSS_DIE_GUILD':
			case 'SMT_FIELDBOSS_DIE_NOGUILD':
				getBossMsg(sysMsg.tokens.npcname)
				whichBoss(bossHunting, bossTemplate)
				if (boss) {
					var nextTime = Date.now() + 5*60*60*1000
					MSG.chat(MSG.RED(boss.name) + " Refresh next time " + MSG.TIP(getTime(nextTime)))
					saveTime()
				}
				break
			
			case 'SMT_WORLDSPAWN_NOTIFY_SPAWN':
				getBossMsg(sysMsg.tokens.npcName)
				whichBoss(bossHunting, bossTemplate)
				if (boss) {
					if ([1276, 1284].includes(bossTemplate)) {
						MSG.party("APPEAR " + boss.name)
					} if (guild){
						MSG.guild("APPEAR" + boss.name )
					} else {
						MSG.chat(MSG.BLU("APPEAR ") + MSG.PIK(boss.name))
					}
					notificationafk("APPEAR " + boss.name)
					saveTime()
				}
				break
			case 'SMT_WORLDSPAWN_NOTIFY_DESPAWN':
				// getBossMsg(sysMsg.tokens.npcName)
				// whichBoss(bossHunting, bossTemplate)
				// if (boss) {
					// MSG.chat(MSG.PIK(boss.name) + MSG.YEL(" Left"))
				// }
				break
			default :
				break
		}
	})
	
	function getBossMsg(id) {
		npcID = id.match(/\d+/ig)
		bossHunting  = parseInt(npcID[0])
		bossTemplate = parseInt(npcID[1])
	}
	
	function whichBoss(h_ID, t_ID) {
		if (mod.settings.bosses.find(b => b.huntingZoneId == h_ID && b.templateId == t_ID)) {
			boss = mod.settings.bosses.find(b => b.huntingZoneId == h_ID && b.templateId == t_ID)
		} else {
			boss = null
		}
	}
	
	function saveTime() {
		for (let i=0; i < mod.settings.bosses.length; i++) {
			if (mod.settings.bosses[i].logTime == undefined) continue
			if (mod.settings.bosses[i].huntingZoneId != bossHunting ) continue
			if (mod.settings.bosses[i].templateId != bossTemplate) continue
			
			mod.settings.bosses[i].logTime = Date.now()
		}
	}
	
	function getTime(thisTime) {
		var Time = new Date(thisTime)
		return	add_0(Time.getMonth()+1) + "/" + add_0(Time.getDate()) + " " +
				add_0(Time.getHours())   + ":" + add_0(Time.getMinutes())
	}
	
	function add_0(i) {
		if (i < 10) {
			i = "0" + i
		}
		return i
	}
	
	function spawnItem(gameId, loc) {
		mod.send('S_SPAWN_DROPITEM', 8, {
			gameId: gameId*10n,
			loc: loc,
			item: mod.settings.itemId,
			amount: 1,
			expiry: 999999,
			owners: [{}]
		})
	}
	
	function despawnItem(gameId) {
		mod.send('S_DESPAWN_DROPITEM', 4, {
			gameId: gameId*10n
		})
	}
	
	// BAM-HP-Bar
	let gage_info = {
			id: 0n,
			huntingZoneId: 0,
			templateId: 0,
			target: 0n,
			unk1: 0,
			unk2: 0,
			curHp: 16000000000n,
			maxHp: 16000000000n,
			unk3: 1
		},
		hooks = []
	
	function update_hp() {
		mod.toClient('S_BOSS_GAGE_INFO', 3, gage_info)
	}
	// 0: 0% <= hp < 20%, 1: 20% <= hp < 40%, 2: 40% <= hp < 60%, 3: 60% <= hp < 80%, 4: 80% <= hp < 100%, 5: 100% hp
	function correct_hp(stage) {
		let boss_hp_stage = BigInt(20*(1+stage))
		// we missed some part of the fight?
		if (gage_info.curHp * 100n / gage_info.maxHp > boss_hp_stage) {
			gage_info.curHp = gage_info.maxHp * boss_hp_stage / 100n
			update_hp()
			mod.command.message('Corrected BOSS HP to <font color="#E69F00">' + String(boss_hp_stage) + '</font>%')
		}
	}
	
	function load(e) {
		gage_info.id = e.gameId
		gage_info.curHp = gage_info.maxHp
		correct_hp(e.hpLevel)
		if (e.mode) {
			mod.command.message('You missed ~ <font color="#E69F00">' + Math.round((99999999 - e.remainingEnrageTime)/1000) + '</font> 秒的战斗')
		}
		
		if (e.hpLevel == 5) {
			mod.command.message("BOSS HP: 100%, Nobody touched it")
		} else if (e.hpLevel == 0) {
			mod.command.message('BOSS BELOW <font color="#FF0000">20%</font> !!!')
		}
		
		if (!hooks.length) {
			setTimeout(update_hp, 1000)
			hook('S_NPC_STATUS', 2, (event) => {
				if (event.gameId === gage_info.id) {
					correct_hp(event.hpLevel)
				}
			})
			
			hook('S_EACH_SKILL_RESULT', 14, (event) => {
				if (event.target === gage_info.id && event.type === 1) {
					gage_info.curHp -= event.value
					update_hp()
				}
			})
			
			hook('S_DESPAWN_NPC', 3, (event) => {
				if (event.gameId === gage_info.id) {
					unload()
				}
			})
		}
	}
	
	function unload() {
		if (hooks.length) {
			for (let h of hooks) {
				mod.unhook(h)
			}
			hooks = []
		}
	}
	
	function hook() {
		hooks.push(mod.hook(...arguments))
	}
	
	function notificationafk(msg, timeout) { // timeout in milsec
		/* notifier.notifyafk({
			title: 'TERA AFK-Notification',
			message: msg,
			wait: false, 
			sound: 'Notification.IM', 
		}, timeout) */
	}
}
