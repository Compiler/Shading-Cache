    uniform sampler2D tex;
		uniform vec2 res;
		uniform vec3 light;
		uniform sampler2D norm;
void main() {
	        vec2 pixel = gl_FragCoord.xy / res.xy;
	        vec4 color = vec4(1.0);//solid white
	        //Distance of the current pixel from the light position
	        float dist = distance(gl_FragCoord.xy,light.xy);
	        vec3 NormalVector = texture2D(norm,pixel).xyz;
	        vec3 LightVector = vec3(light.x - gl_FragCoord.x,light.y - gl_FragCoord.y,60.0);
	        NormalVector.x -= 0.5;
	        NormalVector.y -= 0.5;
	        NormalVector = normalize(NormalVector);
	        LightVector = normalize(LightVector);
	        
	  
	        if(light.z * res.x > dist){
	          float diffuse = max(dot( NormalVector, LightVector ),0.0);
	          float distanceFactor = (1.0 - dist/(light.z * res.x));
	          gl_FragColor = color * diffuse * distanceFactor;
	        } else {
	          gl_FragColor = vec4(0.0);
	        }
}
