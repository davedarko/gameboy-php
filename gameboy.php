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
<table width=100%>
<tr>
<td width=50%>
	<applet code="GameBoyApp.class" archive="gameboy.jar" width="247" height="299"></applet>
</td>
<td width=50%>
<h2>how to?</h2>
1. Draw something<br>
2. Press PRINT Button<br>
3. Save name (Drucken)<br>
4. Wait for return<br>
5. refresh page<p>
<a href="blog.php?tag=gameboy%20printer">more&about</a><p>
<h2>Wie jetzt?</h2>
1. Mal etwas<br>
2. PRINT Knopf dr&uuml;cken<br>
3. Name speichern (Drucken)<br>
4. auf Bild warten<br>
5. Seite neuladen <p>
<a href="blog.php?tag=gameboy%20printer">mehr&dar&uuml;ber</a><p>

</td>
</tr>
</table>

<h2>Gallerie</h2>
<table width=100%>
<tr>
<?php
	$path = "../img/gb";

	$handle=opendir($path);

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

	foreach ($file_names as $file_name) 
	{
		if ($i%3==0 && $i>0) 
		{
			echo "</tr><tr>";
		}
		$meta_data = explode('[/.-]', $file_name);
		echo '<td align=center>';
		echo '<img src="gbapp_converter.php?file='.$path.'/'.$file_name.'&color='.$color.'>';
		echo "<br>";
		echo $meta_data[0];
		echo "<br>";
		echo $meta_data[1];
		echo '</td>';
		$i++;
	}

echo '</tr>';
echo '</table>';
echo '</body>';
echo '</html>';

?>