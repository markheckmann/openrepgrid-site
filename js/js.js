// js functions

function dw(x) {
	document.write(x + "<br>");	
}


// random number vector

function rnum(n) {
	d = [];
	for (var i=0; i < n; i++)
		d.push(Math.random());
	return d;
};

// random number array

function rarray(n, m){
	var b = [];			
	for (var i=0; i < n; i++) 
		b.push(rnum(m));				
	return b;
};

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)];
};

function random_sentence(n) {
	var wordArray = ['abenteuerlich' , 'aktiv' , 'angenehm' , 'animalisch' , 'anmutig' , 'anregend' , 'anspruchsvoll' , 'anziehend' , 'aphrodisierend' , 'atemberaubend' , 'athletisch' , 'attraktiv' , 'aufreizend' , 'ausgelassen' , 'außergewöhnlich' , 'außerordentlich' , 'bedeutend' , 'beeindruckend' , 'beflügelt' , 'befreiend' , 'begehrenswert' , 'begeisternd' , 'beglückend' , 'belebt' , 'berauschend' , 'berühmt' , 'besonders' , 'bewundernswert' , 'bezaubernd' , 'bildlich' , 'brillant' , 'charismatisch' , 'charmant' , 'dominant' , 'duftend' , 'dynamisch' , 'echt' , 'edel' , 'ehrlich' , 'einfühlsam' , 'einzigartig' , 'ekstatisch' , 'elegant' , 'emotional' , 'empfehlenswert' , 'entzückend' , 'erfrischend' , 'erhellend' , 'erotisch' , 'erregend' , 'erstaunlich' , 'erstklassig' , 'exklusiv' , 'extravagant' , 'exzellent' , 'fabelhaft' , 'fantastisch' , 'faszinierend' , 'fein' , 'fesselnd' , 'feurig' , 'freizügig' , 'freudig' , 'freundlich' , 'frisch' , 'fröhlich' , 'geborgen' , 'geheim' , 'geheimnisvoll' , 'geliebt' , 'genüsslich' , 'geschmackvoll' , 'gespannt' , 'gigantisch' , 'glänzend' , 'glücklich' , 'grandios' , 'gravierend' , 'grenzenlos' , 'großartig' , 'harmonisch' , 'heißblütig' , 'hell' , 'hemmungslos' , 'herrlich' , 'hervorragend' , 'hübsch' , 'hüllenlos' , 'humorvoll' , 'ideal' , 'imponierend' , 'individuell' , 'Instinktiv' , 'intelligent' , 'intensiv' , 'interessant' , 'klar' , 'knallig' , 'komfortabel' , 'königlich' , 'kostbar' , 'kraftvoll' , 'kunstvoll' , 'lebendig' , 'lebhaft' , 'leidenschaftlich' , 'leuchtend' , 'liebenswert' , 'lüstern' , 'lustvoll' , 'luxuriös' , 'mächtig' , 'magisch' , 'märchenhaft' , 'maximal' , 'mitreißend' , 'mysteriös' , 'mystisch' , 'packend' , 'perfekt' , 'persönlich' , 'phänomenal' , 'phantastisch' , 'pikant' , 'positiv' , 'potent' , 'prächtig' , 'prall' , 'rasant' , 'real' , 'reich' , 'rein' , 'reizend' , 'riesig' , 'riskant' , 'romantisch' , 'schamlos' , 'scharf' , 'schön' , 'selbstlos' , 'selbstsicher' , 'selten' , 'sensationell' , 'sensibel' , 'sexuell' , 'sinnlich' , 'spannend' , 'spektakulär' , 'sprachlos' , 'spürbar' , 'stark' , 'stilvoll' , 'stürmisch' , 'sündig' , 'sympathisch' , 'traumhaft' , 'überlegen' , 'überwältigend' , 'unfassbar' , 'unglaublich' , 'unsterblich' , 'unwiderstehlich' , 'verblüffend' , 'verführerisch' , 'verlockend' , 'verwöhnt' , 'vital' , 'warm' , 'weiblich' , 'wertvoll' , 'wild' , 'wohlklingend' , 'wohlriechend' , 'wunderbar' , 'wunderschön' , 'wundervoll' , 'zaghaft' , 'zärtlich' , 'zuverlässig' , 'zwischenmenschlich'];
	var res = "";
	for (var i=0; i<n; i++) {
		res = res + " " + wordArray.randomElement();  
	}
	return res;    
}



function get_max_vector_length(a) {
	var d = new Array();
	for (var i = 0; i < a.length; i++) {
		d[i] = Math.sqrt(Math.pow(a[i][0]-.5,2) + Math.pow(a[i][1]-.5,2) + Math.pow(a[i][2]-.5,2));
				
	}
	return Math.max.apply(Math, d);
}


function generate_random_constructs(n) {
	var a = rarray(n, 3); 
	for (var i=0; i < a.length; i++) {
		a[i][3] = random_sentence(2);
		a[i][4] = random_sentence(2);
	}
	return a;
}



/* ------------------------  Virtual Trackball  ------------------------------------------- */

/* center of rotation is at P(0,0,0) 
Technique used: virtual trackball (e.g. http://viewport3d.com/trackball.htm)
step_1: map 2D coordinates to sphere of unit 1 */

function convert_2d_to_3d_coords_on_sphere(x, y, radius){
  x = x / radius;
  y = y / radius;
  z = Math.sqrt(Math.abs( 1 - Math.pow(x, 2) - Math.pow(y, 2)));   // abs to avoid error when values z near 0
  return [x, y, z];
}


/* resize vector if the vector is longer than rad to 
 maximum length given by max.
 v     vector
 max   maximal length of vector, Default=1.
 */
/*function resize_vector_to_maximal_length(v, max){
  
  if (vnorm(v) > rad)
    v <- v * rad / vnorm(v)
  v   
} 
*/



/* Given two vectors on the surface of a sphere will calculates the rotation 
matrix to rotate it from one to the other position.
*/
/* 
rotation_matrix <- function(x1, y1, x2, y2, radius){ 
  // shrink vector if longer than radius of sphere
  v1 = c(x1, y1);
  v2 <- c(x2, y2);
  v1 = resize_vector_to_maximal_length(v1, max=rad)
  v2 = resize_vector_to_maximal_length(v2, max=rad)
      
  // calculate projection onto sphere (i.e. from 2D to 3D)
  s1 <- convert_2d_to_3d_coords_on_sphere(v1[1], v1[2], rad=rad)  // mouse start on sphere  
  s2 <- convert_2d_to_3d_coords_on_sphere(v2[1], v2[2], rad=rad)  // mouse stop on sphere
  
  // calc rotation
  sorth <- cross(s1, s2)                                          // calc orthonormal vector, i.e. rotation axis
  cp <- (s1 / vnorm(s1)) %*% (s2 / vnorm(s2))
  if (cp > 1 & cp < 1.00001)                                      // results may slightly exceed 1 due to numeric imprecision
    cp <- 1       
  theta <- acos(cp)                                               // rotation angle in radians
  //if (sorth == c(0,0,0))                                         // in case s1 and s2 are identical sorth = c(0,0,0)
  (())  return(diag(3))                                              // no 
  R <- rotationMatrix(as.numeric(theta), sorth[1], sorth[2], sorth[3])     // from rgl.
  // delete 4th row and column from quaternion. Transpose as otherwise rotation is 
  // wrong direction as do not want to turn the camera but the model itself
  t(R[-4,-4])                       
} 
 */

