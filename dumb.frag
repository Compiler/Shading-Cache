#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02-(cos(time)/50.), pct, st.y) - 
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/resolution;

    float y = st.x * st.x * st.x* (1.-sin(time * 2.));

    vec3 color = vec3(y);
	y = y / 2.-cos(time);    
    // Plot a line
    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(sin(time),1.0, cos(time * 2.));
    
	gl_FragColor = vec4(color,1.0);
}
