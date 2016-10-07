#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;


void main( void ) {

	
	vec2 position = ( gl_FragCoord.xy / resolution.xy ) - mouse;
	
	float r = 0.0;float g = 0.0;float b = 0.0;
	
	vec2 pt1 = vec2(sin(time), 0.0);
	
	float ds = 1.0-distance(pt1, cos(position) / .2);
	
	if(ds < 0.0){
		r = 1.0 - ds;
	}else{
		b = ds * 1.1;
	}
		
	r = mix(sin(time) / 1.0,b, r);
	
	
	g = smoothstep(0.0, 1.0, sin(r-b));
	
	gl_FragColor.rgb = vec3(r,g,b);
		

}
