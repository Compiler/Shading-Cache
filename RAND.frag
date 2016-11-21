#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

void set(float fir, float bot){
	vec4 col = gl_FragColor;
	float mine = tan(fir);
	//col.b = smoothstep(bot, mine, 1.0);
	col.r = smoothstep(mine, bot, 1.0);
	
	gl_FragColor = col;
}

void main( void ) {

	vec2 position = ( gl_FragCoord.xy / resolution.xy );
	vec4 col = vec4(0.0, 0.0, 0.0, 1.0);
	set(pow(fract(tan(position.y + time)),0.20), pow(fract(position.x),5.));
	//gl_FragColor = col;
	gl_FragColor.r = mod(gl_FragColor.r, 0.2);
	gl_FragColor.g = smoothstep(abs(cos(time)), abs(cos(time)) / 16., 0.68);

