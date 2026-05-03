export const GameTableDBStrings:any = {
    GameTableWithScenesAndNarrations: `
      SELECT
      -- SCENE
      s.id AS scene_id,
      s.chapter AS scene_chapter,
      s.title AS scene_title,
      s.moment AS scene_moment,
      s.table_id AS scene_table_id,

      -- NARRATION
      n.id AS narration_id,
      n.scene_id AS narration_scene_id,
      n.table_id AS narration_table_id,
      n.title AS narration_title,
      n.narration AS narration_text,
      n.moment AS narration_moment,

      -- ACTION
      na.id AS action_id,
      na.test AS action_test,
      na.value AS action_value,
      na.character_id AS action_character_id,
      na.description AS action_description,
      na.dice_roll AS action_dice_roll,
      
      -- CHARACTER (via action)
      ca.id AS action_character_ref_id,
      ca.name AS action_character_name,

      -- CHARACTER (narration_characters)
      nc.id AS narration_character_link_id,
      nc.character_id AS narration_character_id,

      cn.id AS narration_character_ref_id,
      cn.name AS narration_character_name,

      -- NPC
      nn.id AS narration_npc_link_id,
      npc.id AS narration_npc_id,
      npc.character_id AS narration_npc_character_id,
      npc.status AS narration_npc_status,

      c_npc.id AS narration_npc_ref_id,
      c_npc.name AS narration_npc_name,

      -- LOCATION
      nl.id AS narration_location_link_id,
      tl.id AS location_id,
      tl.name AS location_name,
      tl.region AS location_region,
      tl.sub_region AS location_sub_region,
      tl.address AS location_address,
      tl.is_indoor AS location_is_indoor,
      tl.country AS location_country,
      tl.area AS location_area,
      tl.dimensions AS location_dimensions,
      tl.description AS location_description,
      tl.other AS location_other

    FROM scenes s

    LEFT JOIN narrations n 
      ON n.scene_id = s.id

    LEFT JOIN narration_actions na 
      ON na.narrations_id = n.id

    LEFT JOIN characters ca 
      ON ca.id = na.character_id

    LEFT JOIN narration_characters nc 
      ON nc.narrations_id = n.id

    LEFT JOIN characters cn 
      ON cn.id = nc.character_id

    LEFT JOIN narration_npcs nn
      ON nn.narration_id = n.id

    LEFT JOIN game_table_npcs npc
      ON npc.id = nn.npc_id

    LEFT JOIN characters c_npc 
      ON c_npc.id = npc.character_id

    -- LOCATION
    LEFT JOIN narration_locations nl
      ON nl.narrations_id = n.id

    LEFT JOIN table_locations tl
      ON tl.id = nl.location_id

    WHERE s.table_id = ?
      ORDER BY s.chapter ASC, s.moment ASC, n.moment ASC, na.id ASC
    `,
    GameTableCreateNew:`
      INSERT INTO game_tables (id, narrator_id, title, system , intro)
      VALUES (?, ?, ?, ?, ?)
    `,
    GameTableFindAll:`
      SELECT
        g.id AS table_id,
        g.narrator_id AS table_narrator_id,
        g.intro AS table_intro,
        g.title AS table_title,
        g.system AS table_system,
        n.id AS narrator_id,
        n.user_id AS narrator_user_id,
        n.name AS narrator_name,
        u.username AS user_username,
        u.email AS user_email,
        u.phone AS user_phone,
        u.type AS user_type,
        p.user_id AS player_user_id,
        c.id AS character_id,
        c.user_id AS character_user_id,
        c.name AS character_name,
        cs.id AS sheet_id,
        cs.name AS sheet_name,
        cs.bio AS sheet_bio,
        cs.backstory AS sheet_backstory,
        cs.points AS sheet_points,
        cs.hp AS sheet_hp,
        cs.st AS sheet_st,
        cs.dx AS sheet_dx,
        cs.iq AS sheet_iq,
        cs.ht AS sheet_ht,
        cs.fatigue AS sheet_fatigue,
        cs.encumbrance AS sheet_encumbrance,
        d.id AS damage_id,
        d.name AS damage_name,
        d.description AS damage_description,
        d.type AS damage_type,
        d.value AS damage_value,
        d.range AS damage_range,
        d.item_id AS damage_item_id,
        d.skill_id AS damage_skill_id,
        d.advantage_id AS damage_advantage_id,
        i.id AS item_id,
        i.name AS item_name,
        i.type AS item_type,
        i.category AS item_category,
        i.weight AS item_weight,
        i.dimensions AS item_dimensions,
        i.description AS item_description,
        i.quality AS item_quality,
        i.condition AS item_condition,
        i.holder_id AS item_holder_id,
        i.owner_id AS item_owner_id,
        i.skill_user_id AS item_skill_user_id,
        i.skill_level AS item_skill_level,
        a.id AS advantage_id,
        a.name AS advantage_name,
        a.cost_points AS advantage_cost_points,
        a.effect AS advantage_effect,
        csk.id AS character_skill_id,
        csk.skill_id AS character_skill_skill_id,
        csk.cost_points AS character_skill_cost_points,
        csk.effect AS character_skill_effect,
        pec.id AS peculiarity_id,
        pec.name AS peculiarity_name,
        pec.cost_points AS peculiarity_cost_points,
        pec.effect AS peculiarity_effect
      FROM game_tables g
      JOIN narrators n ON g.narrator_id = n.id
      JOIN users u ON n.user_id = u.id
      LEFT JOIN game_table_players p ON p.table_id = g.id
      LEFT JOIN characters c ON c.table_id = g.id AND c.user_id = p.user_id
      LEFT JOIN character_sheets cs ON cs.character_id = c.id
      LEFT JOIN damages d ON d.character_id = c.id
      LEFT JOIN items i ON i.holder_id = p.user_id
      LEFT JOIN character_advantages a ON a.character_id = c.id
      LEFT JOIN character_skills csk ON csk.character_id = c.id
      LEFT JOIN peculiarities pec ON pec.character_id = c.id
    `,
    GameTableFindById:`
      SELECT
        g.id AS table_id,
        g.narrator_id AS table_narrator_id,
        g.intro AS table_intro,
        g.title AS table_title,
        n.id AS narrator_id,
        n.user_id AS narrator_user_id,
        n.name AS narrator_name,
        u.username AS user_username,
        u.email AS user_email,
        u.phone AS user_phone,
        u.type AS user_type,
        p.user_id AS player_user_id,
        c.id AS character_id,
        c.user_id AS character_user_id,
        c.name AS character_name,
        cs.id AS sheet_id,
        cs.name AS sheet_name,
        cs.bio AS sheet_bio,
        cs.backstory AS sheet_backstory,
        cs.points AS sheet_points,
        cs.hp AS sheet_hp,
        cs.st AS sheet_st,
        cs.dx AS sheet_dx,
        cs.iq AS sheet_iq,
        cs.ht AS sheet_ht,
        cs.fatigue AS sheet_fatigue,
        cs.encumbrance AS sheet_encumbrance,
        d.id AS damage_id,
        d.name AS damage_name,
        d.description AS damage_description,
        d.type AS damage_type,
        d.value AS damage_value,
        d.range AS damage_range,
        d.item_id AS damage_item_id,
        d.skill_id AS damage_skill_id,
        d.advantage_id AS damage_advantage_id,
        i.id AS item_id,
        i.name AS item_name,
        i.type AS item_type,
        i.category AS item_category,
        i.weight AS item_weight,
        i.dimensions AS item_dimensions,
        i.description AS item_description,
        i.quality AS item_quality,
        i.condition AS item_condition,
        i.holder_id AS item_holder_id,
        i.owner_id AS item_owner_id,
        i.skill_user_id AS item_skill_user_id,
        i.skill_level AS item_skill_level,
        a.id AS advantage_id,
        a.name AS advantage_name,
        a.cost_points AS advantage_cost_points,
        a.effect AS advantage_effect,
        csk.id AS character_skill_id,
        csk.skill_id AS character_skill_skill_id,
        csk.cost_points AS character_skill_cost_points,
        csk.effect AS character_skill_effect,
        pec.id AS peculiarity_id,
        pec.name AS peculiarity_name,
        pec.cost_points AS peculiarity_cost_points,
        pec.effect AS peculiarity_effect
      FROM game_tables g
      JOIN narrators n ON g.narrator_id = n.id
      JOIN users u ON n.user_id = u.id
      LEFT JOIN game_table_players p ON p.table_id = g.id
      LEFT JOIN characters c ON c.table_id = g.id AND c.user_id = p.user_id
      LEFT JOIN character_sheets cs ON cs.character_id = c.id
      LEFT JOIN damages d ON d.character_id = c.id
      LEFT JOIN items i ON i.holder_id = p.user_id
      LEFT JOIN character_advantages a ON a.character_id = c.id
      LEFT JOIN character_skills csk ON csk.character_id = c.id
      LEFT JOIN peculiarities pec ON pec.character_id = c.id
      WHERE g.id = ?
    `,
    GameTableFindBySceneId:`
      SELECT
        s.id AS scene_id,
        s.table_id AS scene_table_id,
        n.id AS narration_id,
        n.scene_id AS narration_scene_id,
        n.table_id AS narration_table_id,
        n.narration AS narration_text,
        n.moment AS narration_moment,
        a.id AS action_id,
        a.name AS action_name,
        a.description AS action_description,
        a.user_id AS action_user_id,
        c.id AS character_id,
        c.name AS character_name
      FROM scenes s
      LEFT JOIN narrations n ON n.scene_id = s.id
      LEFT JOIN actions a ON a.scene_id = s.id
      LEFT JOIN characters c ON c.user_id = a.user_id AND c.table_id = s.table_id
      WHERE s.id = ?
      ORDER BY n.moment ASC, a.id ASC
    `,
    GameTableFindTableById:`
      SELECT
        id,
        narrator_id,
        intro,
        title
      FROM game_tables
      WHERE id = ?
    `,
    GameTableEdit:`
      UPDATE game_tables
      SET title = ?, intro = ?, system = ?
      WHERE id = ?
    `
}