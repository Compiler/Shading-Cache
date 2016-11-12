
#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
uniform sampler2D backbuffer;
varying vec2 surfacePosition;

vec3 star(vec2 uv,float scale,float seed){
	uv*=scale;vec2 s=floor(uv),f=fract(uv),p;float k=3.,d;
	p=.5+.44*sin(11.*fract(sin((s+seed)*mat2(7.5,3.3,6.2,5.4))*55.))-f;d=length(p);k=min(d,k);
	k=smoothstep(0.,k,0.007);
    	return k*vec3(k,k,1.);
}

void main(void){
	vec2 sp = (surfacePosition*0.5+0.5)*1.0-0.5;
	sp = mix(sp,sp/dot(sp,sp),max(0.0,sin(time*0.1)));
	vec4 b=texture2D(backbuffer,abs(fract(sp*0.5*sin(time*0.2)*resolution.x/resolution.xy)));
	vec2 uv=sp*0.5;
	//uv /= 1.-dot(uv,uv);
	vec3 c=vec3(0);
	for(float i=0.;i<20.;i+=2.)c+=star(uv,mod(20.+i-time*1.,20.),i*5.1);
	gl_FragColor = vec4(c+b.gbb*.8,1);
}
