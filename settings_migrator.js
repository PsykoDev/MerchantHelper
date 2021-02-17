const DefaultSettings = {
    "enabled":  true,
    "alerted":  true, // Flashalert
    "notice":   true, // Notice
    "party":   false, // PARTY
    "guild":   false, // GUILD
    "messager": true, // Message
    "marker":   true, // Marker
    "itemId":  206976, // Velika Banquet Coin
    "bosses": [
/* ==== South ======================================================================================== */
        {huntingZoneId:   2, templateId: 1271, name: "[Acardia]Arkun(Forêt féérique)"},
        {huntingZoneId:   3, templateId: 1271, name: "[Acardia]Arkun(Bois de l'Oubli)"},
        {huntingZoneId:   5, templateId: 1271, name: "[Acardia]Arkun(Marais Tuwangi)"},
        {huntingZoneId:   6, templateId: 1271, name: "[Acardia]Arkun(Vallée des Titans)"},
        {huntingZoneId:   7, templateId: 1271, name: "[Acardia]Arkun(Collines célestes)"},
        {huntingZoneId:   4, templateId: 1271, name: "[Ostgarath]Eteral(Montagne Fyr)"},
        {huntingZoneId:   9, templateId: 1271, name: "[Ostgarath]Eteral(Vallée de l'Ascension)"},
        {huntingZoneId:  10, templateId: 1271, name: "[Ostgarath]Eteral(Île Serpentis)"},
        {huntingZoneId:  11, templateId: 1271, name: "[Ostgarath]Eteral(Port coupe gorge/Grotte des pirates)"},
        {huntingZoneId:  12, templateId: 1271, name: "[Ostgarath]Eteral(Ile des brumes)"},
        {huntingZoneId:  15, templateId: 1271, name: "[Poporia]Foretta(Falaises de la Folie)"},
        {huntingZoneId:  16, templateId: 1271, name: "[Poporia]Foretta(Val du Croc)"},
        {huntingZoneId:  17, templateId: 1271, name: "[Poporia]Foretta(Ravin de Paraanon)"},
        {huntingZoneId:  23, templateId: 1271, name: "[Poporia]Foretta(Lac des Larmes)"},
        {huntingZoneId:  18, templateId: 1271, name: "[Val Aureum]Viadu(Ruines colossale)"},
        {huntingZoneId:  19, templateId: 1271, name: "[Val Aureum]Viadu(Terres libres)"},
        {huntingZoneId:  21, templateId: 1271, name: "[Val Aureum]Viadu(Roc du Basilic)"},
        {huntingZoneId:  24, templateId: 1271, name: "[Val Aureum]Viadu(Route d'Aurum)"},
/* ==== 夏拉南部 ======================================================================================== */
        {huntingZoneId:  26, templateId: 1271, name: "[Essenia]Ezart(Bassin béni)"},
        {huntingZoneId:  27, templateId: 1271, name: "[Essenia]Ezart(Crête essénianne)"},
        {huntingZoneId:  28, templateId: 1271, name: "[Essenia]Ezart(Bois malade)"},
        {huntingZoneId:  29, templateId: 1271, name: "[Essenia]Ezart(Bois intemporels)"},
        {huntingZoneId:  30, templateId: 1271, name: "[Veritas]Versa(Refuge de Balder)"},
	{huntingZoneId:  31, templateId: 1271, name: "[Veritas]Versa(Plaine des Tempêtes)"},
        {huntingZoneId:  31, templateId: 1271, name: "[Westonia]Storan(Plaine des Tempêtes)"},
        {huntingZoneId:  32, templateId: 1271, name: "[Westonia]Storan(Mont Tyrannas)"},
        {huntingZoneId:  34, templateId: 1271, name: "[Westonia]Storan(Plaine gelée)"},
        {huntingZoneId:  35, templateId: 1271, name: "[Val Elenium]Viace(Gorge du Wyrm)"},
        {huntingZoneId:  36, templateId: 1271, name: "[Val Elenium]Viace(Tor Exsul)"},
        {huntingZoneId:  38, templateId: 1271, name: "[Val Elenium]Viace(Gorges de Sienna)"},
        {huntingZoneId:  40, templateId: 1271, name: "[Val Palrada]Vaneva(Zone de quarantaine)"},
        {huntingZoneId:  41, templateId: 1271, name: "[Val Palrada]Vaneva(Vallée sauvage)"},
/* ==== 夏拉北部 ======================================================================================== */
        {huntingZoneId:  45, templateId: 1271, name: "[Val Tirkai]Lotica(Forteresse de la Servitude)"},
        {huntingZoneId:  47, templateId: 1271, name: "[Val Tirkai]Lotica(Forêt de Tirkai)"},
        {huntingZoneId:  48, templateId: 1271, name: "[Helkan]Hecurn(Front de Khanovar)"},
        {huntingZoneId:  49, templateId: 1271, name: "[Val Kaeli]Locarnum(Argonea)"},
        {huntingZoneId:  50, templateId: 1271, name: "[Val Kaeli]Locarnum(Granarkus)"},
        {huntingZoneId:  51, templateId: 1271, name: "[Lorcada]Loahcun(Vallée des Aiguilles)"},
        {huntingZoneId:  52, templateId: 1271, name: "[Lorcada]Loahcun(Plaine des Damnés)"},
        {huntingZoneId:  54, templateId: 1271, name: "[Sylvanoth]Silvette(Taillis de Morteseaux)"},
        {huntingZoneId:  55, templateId: 1271, name: "[Sylvanoth]Silvette(Bois obscur)"},
        {huntingZoneId:  56, templateId: 1271, name: "[Sylvanoth]Silvette(Bois Sussurus)"},
        {huntingZoneId:  57, templateId: 1271, name: "[Sylvanoth]Silvette(Amena Quatla)"},
/* ===== 亚伦北部 ======================================================================================= */
        {huntingZoneId: 172, templateId: 1271, name: "[Val Oriyn]Varrek(Plaine barbare)"},
        {huntingZoneId: 181, templateId: 1271, name: "[Val Oriyn]Varrek(Ex Prima)"},
        {huntingZoneId: 182, templateId: 1271, name: "[Val Oriyn]Varrek(Vallée printanière)"},
        {huntingZoneId: 183, templateId: 1278, name: "[Val Oriyn]Varrek(Hautegarde)"},
        {huntingZoneId: 191, templateId: 1271, name: "[Val Oriyn]Varrek(Arx Umbra)"},
/* ==== 保護領地 ======================================================================================== */
        {huntingZoneId:  13, templateId: 1271, name: "[Île de l'Aube]Vardung(Île de l'Aube)"},
/* ==== 直辖領地 ======================================================================================== */
        {huntingZoneId:  63, templateId: 1278, name: "[Velika]Veracun(Velika)"},
        {huntingZoneId:  72, templateId: 1278, name: "[Allemantheia]Alluman(Allemantheia)"},
        {huntingZoneId:  84, templateId: 1278, name: "[Kaiator]Kaidera(Kaiator)"},
/* ==== 神秘商店 ======================================================================================== */
        {huntingZoneId:  63, templateId: 1271, name: "Mystery Merchant(Petam-1)(Velika)"},
        {huntingZoneId:  63, templateId: 1279, name: "Mystery Merchant(Petam-2)(Velika)"},
        {huntingZoneId:  72, templateId: 1271, name: "Mystery Merchant(Hemusk)(Allemantheia)"},
        {huntingZoneId:  84, templateId: 1271, name: "Mystery Merchant(Kaylight)(Kaiator)"},
        {huntingZoneId: 183, templateId: 1271, name: "Mystery Merchant(Jondo)(Highwatch)"},
/* ==== 交付哥布林 ====================================================================================== */
        {huntingZoneId:  63, templateId: 1276, logTime: 0, name: "1-Mystery Market(Velika)"},
        {huntingZoneId:  63, templateId: 1284,             name: "1-Mystery Market(Velika)"},
        {huntingZoneId:  84, templateId: 1276, logTime: 0, name: "2-Mystery Market(Kaiator)"},
        {huntingZoneId:  72, templateId: 1276, logTime: 0, name: "3-Mystery Market(Allemantheia)"},
        {huntingZoneId: 183, templateId: 1276, logTime: 0, name: "4-Mystery Market(Highwatch)"},
/* ==== 世界BOSS ======================================================================================== */
        {huntingZoneId:  26, templateId: 5001, logTime: 0, name: "Ortan [Essenia]"},
        {huntingZoneId:  39, templateId:  501, logTime: 0, name: "Hazard [Val Palrada]"},
        {huntingZoneId:  51, templateId: 4001, logTime: 0, name: "Cerrus [Lorcada]"}
    ]
}

module.exports = function MigrateSettings(from_ver, to_ver, settings) {
    if (from_ver === undefined) {
        // Migrate legacy config file
        return Object.assign(Object.assign({}, DefaultSettings), settings)
    } else if (from_ver === null) {
        // No config file exists, use default settings
        return DefaultSettings
    } else {
        // Migrate from older version (using the new system) to latest one
        if (from_ver + 1 < to_ver) { // Recursively upgrade in one-version steps
            settings = MigrateSettings(from_ver, from_ver + 1, settings)
            return MigrateSettings(from_ver + 1, to_ver, settings)
        }
        // If we reach this point it's guaranteed that from_ver === to_ver - 1, so we can implement
        // a switch for each version step that upgrades to the next version. This enables us to
        // upgrade from any version to the latest version without additional effort!
        switch (to_ver) {
            default:
                let oldsettings = settings
                settings = Object.assign(DefaultSettings, {})
                for (let option in oldsettings) {
                    if (settings[option]) {
                        settings[option] = oldsettings[option]
                    }
                }
                break
        }
        return settings
    }
}
