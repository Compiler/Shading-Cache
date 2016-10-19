#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
//Ashok Gowtham M
#define pi 3.1415926536
#define N 20
#define starComplexity 47000.0

void main( void ) {

	vec2 position = ( gl_FragCoord.xy / resolution.xy )*0.5;
	vec2 center=position*2.-1. * 0.5;
	center.x*=resolution.x/resolution.y;
	float c=0.;
	float r=.3;
	float o;
	for(int i=0;i<N;i++)
	{
		vec2 xy;
		o=float(i)/float(N)*2.*pi;
		xy.x=r*cos(o);
		xy.y=r*sin(o);
		xy+=center;
		float r1 = length(xy);
		float a1 = atan(xy.x,xy.y);
		c+=pow(200000.,(1.-r1*2./r+sin(a1*starComplexity-time*10.)*.1)*(0.80+0.25*pow(fract(float(-i)/float(N)-time*.55),2.5)))/10000.0;
	}
	gl_FragColor = vec4( (c)*vec3(0.01+sin(time)*3.,.015,.02),1.0 );

}
