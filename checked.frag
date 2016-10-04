#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;


void main( void ) {

	vec2 position = ( gl_FragCoord.xy / resolution.xy );
	
	float modu = mod(2.0, position.y);
	
	
	float scl = sin(time) * 10.0;
	float r = (mod(sin(cos(time)) * scl + 15.0, 1.0-position.y));
	float rr = (mod(sin(sin(time)) * scl + 15.0, position.y));
	float g = (mod(cos(sin(time)) * scl + 15.0, 1.0-position.x));
	float gg = (mod(cos(cos(time)) * scl + 15.0, position.y));
	
	gl_FragColor.rgb = vec3(mix(r,rr,gg),mix(r,g,gg),mix(g,r,gg));
		

}
