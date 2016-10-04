fullscreengalleryhide codecompiled successfullysave

	else {
		gl_FragColor.gbr = vec3(r,g,b) * 1.0;
	}
 1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
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
