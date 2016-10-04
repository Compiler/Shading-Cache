#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;


void r(float r){
	gl_FragColor.r = r;
}
void g(float g){
	gl_FragColor.g = g;
}
void b(float   b){
	gl_FragColor.b = b;
}
void rgb(float r, float g, float b){
	gl_FragColor.rgb = vec3(r,g,b);
}
void rgb(float a){
	gl_FragColor.rgb = vec3(a);
}
void flip(){
	
	gl_FragColor.rgb = 1.0-gl_FragColor.rgb;
}

void vignetteSetFinal(float len, float inner, float outer){
	
	rgb(smoothstep(outer, inner, (len * 2.0)));
}

void main( void ) {

	vec2 position = ( gl_FragCoord.xy / resolution.xy ) -+ mouse;

	
	float len = length(position);
	
	vignetteSetFinal(len, 0.5, 0.85);

}
