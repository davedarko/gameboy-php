<?php

echo '<!DOCTYPE html>';
echo '<html>';
echo '<head>';
echo '<meta charset="utf-8">';
echo '<meta name="description" content="">';
echo '<meta name="author" content="">';

echo '<!-- Mobile Specific Metas -->';
echo '<meta name="viewport" content="width=device-width, initial-scale=1">';

echo '<!-- CSS -->';
echo '<style>';
include('../css/normalize.min.css');
include('../css/skeleton.min.css');
include('../css/font.min.css');
include('../css/custom.min.css');
echo '</style>';
echo '<title>';
echo 'davedarko.com';
echo '</title>';
echo '</head>';

echo '<body>';

	$title="Gameboy Applet";

	$color = "ffddbb";
	if (!empty($_GET['color'])) 
	{
		$color = $_GET['color'];
	}
?>
<h1>Gameboy Applet</h2>
<div class="container">
	<div class="row">
		<div class="four columns">
		<applet 
			code="GameBoyApp.class" 
			archive="gameboy.jar" 
			width="247"
			height="299"
			>
		</applet>
		</div>

		<div class="eight columns">
			<h2>how to?</h2>
			<ul>
			<li>Draw something</li>
			<li>Press PRINT Button</li>
			<li>Save name (Drucken)</li>
			<li>Wait for return</li>
			<li>refresh page</li>

			<h2>Wie jetzt?</h2>
			<ul>
			<li>Mal etwas</li>
			<li>PRINT Knopf dr&uuml;cken</li>
			<li>Name speichern (Drucken)</li>
			<li>auf Bild warten</li>
			<li>Seite neuladen</li>
			</ul>
		</div>
	</div>

<h2>Gallerie</h2>
<div class="row">
	<div class="four columns">
	</div>
	<div class="four columns">
	</div>
	<div class="four columns">
	</div>
</div>
<?php
	$path = "img/gb";

	$handle=opendir('../'.$path);

    $file_names = array();
    while ($datei = readdir($handle))
    {
    	if (substr($datei,-3,3)=="dat") 
    	{
    		array_push($file_names, $datei);
    	}
    }
	rsort($file_names);

	$cnt = count($file_names);
	$i=0;

	echo '<div class="row">';
	foreach ($file_names as $file_name) 
	{
		if ($i%4==0 && $i>0) 
		{
			echo '</div>';
			echo '<div class="row">';
		}
		
		echo '<div class="three columns">';
		echo '<img src="gbapp_converter.php?file='.$path.'/'.$file_name.'&color='.$color.'">';
		echo '<br>';
		echo $file_name;
		echo '</div>';
		$i++;
	}
	echo '</div>';

echo '</div>';
echo '</body>';
echo '</html>';

?>