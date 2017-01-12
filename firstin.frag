
vec3 drawoffset(vec2 p, float offx, float offy, vec3 col){
    vec2 q = p - vec2(0.5, 0.5);
    float num = 17.0;
    float st = (q.y * 50.0 * cos(iGlobalTime));
    float r = 0.15 + 0.25 * cos(atan(q.x, q.y)* num + st);
    q.x += offx;
    q.y += offy;
    col *= smoothstep(r, r + 0.01,length (q));
    
    col.g += 1.0 -smoothstep(r - 0.2, r + 0.01,length (q));

    
    return col;
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 p = fragCoord.xy / iResolution.xy;
    vec2 q = p - vec2(0.5, 0.5);
    vec3 col = vec3(0.21, 0.0, 0.0);
    
   
    
    float num = 17.0;
    float st = (q.y * 50.0 * cos(iGlobalTime));
    float r = 0.15 + 0.1 * cos(atan(q.x, q.y)* num + st);
    
    col *= smoothstep(r, r + 0.01,length (q));
    
    col.g += 1.0 -smoothstep(r - 0.2, r + 0.01,length (q));
    
    
   /* q.x -= 0.35;
    r = 0.15 + 0.1 * cos(atan(q.x, q.y)* num - st);
    col *= smoothstep(r, r + 0.01,length (q));
    
    col.b += 1.0 -smoothstep(r - 0.2, r + 0.01,length (q));*/
    
    
    for(float i = 0.0; i < 1.0; i += 0.075)
        col = drawoffset(p, i, 0.0, col);
    
    
	fragColor = vec4(col,1.0);
}
