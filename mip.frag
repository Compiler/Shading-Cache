#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;


void main( void ) {

	vec2 position = ( gl_FragCoord.xy / resolution.xy );
	float brightness = 0.5;
	float creep = 0.05;
	gl_FragColor.rgb = vec3(smoothstep(creep, brightness, mod(15.0, 1.0-position.y)), smoothstep(creep - 0.2, brightness * 3.0, mod(5.0, 1.0-position.y)), 0.0);
		

}
