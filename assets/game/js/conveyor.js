var conveyor = new Object; conveyor.init = function () { conveyor.tile_types = { GEAR: 0, BELT: 1 }, conveyor.tile_count = 2, conveyor.atlas = imageset.load("images/conveyor.png"), conveyor.tile_size = 16, conveyor.anim_data = [{ animation_frames: 4, frame_duration: 2, current_frame: 0 }, { animation_frames: 4, frame_duration: 1, current_frame: 0 }], conveyor.top = 192, conveyor.left = 80, conveyor.belts_per_gear = 4, conveyor.active = !1 }, conveyor.get_speed = function () { return conveyor.active ? -1 : 0 }, conveyor.logic = function () { if (conveyor.active) for (var e = 0; e < conveyor.tile_count; e++)conveyor.anim_data[e].current_frame++, conveyor.anim_data[e].current_frame == conveyor.anim_data[e].animation_frames * conveyor.anim_data[e].frame_duration && (conveyor.anim_data[e].current_frame = 0) }, conveyor.render = function () { var e; e = Math.floor(conveyor.anim_data[conveyor.tile_types.BELT].current_frame / conveyor.anim_data[conveyor.tile_types.BELT].frame_duration); for (var o = conveyor.left + conveyor.tile_size / 2; o < game_main.VIEW_WIDTH; o += conveyor.tile_size)conveyor.render_tile(conveyor.tile_types.BELT, e, o, conveyor.top); e = Math.floor(conveyor.anim_data[conveyor.tile_types.GEAR].current_frame / conveyor.anim_data[conveyor.tile_types.GEAR].frame_duration); for (o = conveyor.left; o < game_main.VIEW_WIDTH; o += conveyor.tile_size * conveyor.belts_per_gear)conveyor.render_tile(conveyor.tile_types.GEAR, e, o, conveyor.top) }, conveyor.render_tile = function (e, o, r, n) { imageset.render(conveyor.atlas, e * conveyor.tile_size, o * conveyor.tile_size, conveyor.tile_size, conveyor.tile_size, r, n) };