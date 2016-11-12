
#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

#define STEPS 64
#define MIN_DISTANCE 0.001

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

struct Ray
{
    vec3 vOrigin;
    vec3 vDir;
};

float vmax(vec3 v)
{
	return max(max(v.x, v.y), v.z);
}

float sdf_sphere (vec3 p, vec3 c, float r)
{
//	p.x = fract(p.x*0.15)*5.0;
//	p.z = fract(p.z);

    return distance(p,c) - r;
}

float sdf_torus( vec3 p, vec3 c, vec2 t )
{
	p += c;
	return length( vec2(length(p.xz)-t.x,p.y) )-t.y;
}


float sdf_boxcheap(vec3 p, vec3 c, vec3 s)
{
	return vmax(abs(p-c) - s);
}

float sdf_blend(float d1, float d2, float a)
{
	return a * d1 + (1.0 - a) * d2;
}

float sdf_smin(float a, float b, float k)
{
	float res = exp(-k*a) + exp(-k*b);
	return -log(max(0.0001,res)) / k;
}
	
float searchScene (vec3 p)
{
	
	

	float a = sdf_smin
		(
		sdf_sphere(p, vec3(sin(time)*.4), .2),
		sdf_boxcheap(mod(p, 0.5)-0.25, vec3(.0), vec3(0.04, 0.15, 0.05)),
		16.0
		);
	
	
	
	a = sdf_smin
		(
		sdf_sphere(mod(p, 1.5)-0.75, vec3(0.0, 0.0,sin(time*2.0)*.3), .15),
		a,
		16.0
		);
	
		
	a = sdf_smin
		(
		sdf_torus(p, vec3(0.0,sin(time)*.55, 0.0), vec2(0.25, 0.05)),
		a,
		16.0
		);
	
	return a;
}

vec3 normal (vec3 p)
{
	const float eps = 0.005;

	return normalize
	(	vec3
		(	searchScene(p + vec3(eps, 0., 0.)	) - searchScene(p - vec3(eps, 0., 0.)),
			searchScene(p + vec3(0., eps, 0.)	) - searchScene(p - vec3(0., eps, 0.)),
			searchScene(p + vec3(0., 0., eps)	) - searchScene(p - vec3(0., 0., eps))
		)
	);
}

vec3 simpleLambert (vec3 normal) {
	vec3 lightDir = vec3(-0.5, 1.0, -0.5);
	vec3 lightCol = vec3(0.7, 0.9, 1.0);

	float NdotL = max(dot(normal, lightDir),0.0);
	vec3 c = lightCol * NdotL;
	
	lightDir = vec3(0.5, -0.25, -0.5);
	lightCol = vec3(1.5, 0.6, 0.0);

	NdotL = max(dot(normal, lightDir),0.0);
	c += lightCol * NdotL;
	
	c += vec3(0.0, 0.1, 0.0);
	
	return c;
}

vec3 raymarch (vec3 position, vec3 direction)
{
	for (int i = 0; i < STEPS; i++)
	{
		float distance = searchScene(position);
		if (distance < MIN_DISTANCE)
			return simpleLambert(normal(position));
			//return vec3(1.0, 0.0, 0.0);
		 	
		position += distance * direction;
	}
	return vec3(0.0, 0.1, 0.1);
}

Ray cameraRay( const in vec3 vPos, const in vec3 vForwards, const in vec3 vWorldUp)
{
	vec2 vPixelCoord = gl_FragCoord.xy;
	vec2 vUV = ( vPixelCoord / resolution.xy );
	vec2 vViewCoord = vUV * 2.0 - 1.0;
	
	vViewCoord *= 1.0;
	
	float fRatio = resolution.x / resolution.y;
	
	vViewCoord.y /= fRatio;  
	
	Ray ray;
	
	ray.vOrigin = vPos;
	
	vec3 vRight = normalize(cross(vForwards, vWorldUp));
	vec3 vUp = cross(vRight, vForwards);
	
	ray.vDir = normalize( vRight * vViewCoord.x + vUp * vViewCoord.y + vForwards); 
	return ray;
}
 
Ray cameraRayLookat( const in vec3 vPos, const in vec3 vInterest)
{
	vec3 vForwards = normalize(vInterest - vPos);
	vec3 vUp = vec3(0.0, 1.0, 0.0);
	
	return cameraRay(vPos, vForwards, vUp);
}

void main( void ) {
	
	//move to global?
	vec3 cameraPos = vec3(0.0);
	cameraPos.x = sin(time*.3);
	cameraPos.z = cos(time*.3);
	cameraPos.y = 1.0;
	
	
	Ray ray = cameraRayLookat( cameraPos, vec3(0.0));
	

	vec3 color = raymarch(ray.vOrigin, ray.vDir);

	gl_FragColor = vec4(color, 1.0);
	//gl_FragColor = vec4(screenPos.x, screenPos.y, 0.0, 1.0);

}
