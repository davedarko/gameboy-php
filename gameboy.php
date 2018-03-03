<?php
	$title="Gameboy Applet";
	include ("head.php");
	if (!empty($_GET['color'])) $color = $_GET['color'];
	else $color = "ffddbb";
?>
<h1>Gameboy Applet</h2>
<table width=100%>
<tr>
<td width=50%><applet code="GameBoyApp.class" archive="gameboy.jar" width="247" height="299"></applet></td>
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

	$handle=opendir("./gameboyapp"); 
    $blarray = array();
    while ($datei = readdir($handle)) if ( substr($datei,-3,3)=="dat" ) array_push($blarray, $datei);
	rsort($blarray);
	$cnt = count($blarray);
	$i=0;
	foreach ($blarray as $key => $val) {
		if ($i%3==0 && $i>0) echo "</tr><tr>";
		$rheuma = split('[/.-]', $val);
		echo "<td align=center><a href=\"gbapp_converter.php?file=./gameboyapp/$val&color=$color\"><img src=\"gbapp_converter.php?file=./gameboyapp/$val&color=$color\"></a><br>".$rheuma[0] ."<br>" . $rheuma[1] ."<p></td>\n";
		$i++;
	}
?>
</tr>
</table>

<?php
	include ("fooder.php");
?>
