#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;


void main( void ) {

	
	vec2 position = ( gl_FragCoord.xy / resolution.xy );
	
	float r = 0.0;float g = 0.0;float b = 0.0;
	

	float val = (100.0);
	float ins = 1.0;
	float subber = cos(time) * ins;
	r = smoothstep(0.025+ cos(time) / val, 0.0005 + cos(time) / val, length(atan(position.x - subber)));
	b = smoothstep(0.055+ cos(time) / val, 0.0025 + cos(time) / val, length(position.x - subber));
	g = smoothstep(0.025+ cos(time) / val, 0.005 + cos(time) / val, length(position.x - subber));
	
	r+= .1;
	
	if(sin((time)) < 0.5){
		gl_FragColor.rgb = vec3(r,g,b);
	}else if(sin((time)) < 0.25){
		gl_FragColor.grb = vec3(r,g,b);
	}else if(sin((time)) < 0.0){
		gl_FragColor.brg = vec3(r,g,b);
	}else if(sin((time)) < -0.75){
		gl_FragColor.brg = vec3(r,g,b) * 2.0;
	}else if(sin((time)) < -0.5){
		gl_FragColor.brg = vec3(r,g,b) / 2.0;
	}else if(sin((time)) < -0.25){
		gl_FragColor.rgb = vec3(g,g,g);
	}
	else {
		gl_FragColor.gbr = vec3(r,g,b) * 1.0;
	}
	
		

}
