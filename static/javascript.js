var total = 0;
		var play = false;
		var time;				// Το ID της set.Interval()
		var seconds=7;
		var flag=0;				// 6. Σημαία για restart ή reverse
		
		function display(element) {
			if (!play) {
				play = true;
				document.getElementById("tmr").style.color = "green";		// Έναρξη - πράσινο
				
				time=window.setInterval(function(){							// Αντίστροφη μέτρηση
					seconds--;
					if (seconds==0) {
						window.clearInterval(time);							// Τέλος χρόνου
						document.getElementById("tmr").style.color = "red";	// Λήξη - κόκκινο
					}
					element.form.timer.value = seconds;
				}, 1000);
			}
			
			if (seconds==0) {
				element.checked = !element.checked;							// Απενεργοποίηση (απο)επιλογών
				
				return 0;
			}
			
			if (!flag)			// 6. Όταν flag==0 επιτρέπονται επιλογές, αλλά όχι απο-επιλογές
				if (element.checked) {
					//if (total>=2) window.location.href = "https://youtube.com";	// 5. Όταν επιλεγούν 3 checkboxes, μεταφορά στο YouTube
					//if (total>=2) element.checked = !element.checked;		// 3. Όταν επιλεγούν 2 checkboxes, δεν επιλέγονται περισσότερα...
					//else 													// 3. ...και σταματά η μέτρηση
					total++;											// Μέτρηση επιλεγμένων checkboxes
					//window.alert(total);								// 2. Alert window όταν επιλέγεται ένα checkbox
				} else element.checked = !element.checked;				// 2. Δεν απο-επιλέγεται ένα επιλεγμένο checkbox
			
			else				// 6. Όταν flag==1 επιτρέπονται από-επιλογές, αλλά όχι επιλογές
				if (!element.checked) total++;							// 6. Μέτρηση από-επιλεγμένων checkboxes
				else element.checked = !element.checked;				// 6. Δεν επιλέγεται ένα από-επιλεγμένο checkbox
			//total++;													// 4. Μέτρηση επιλογών και απο-επιλογών (πρέπει να μπει σε σχόλιο το από πάνω if-else)
			element.form.counter.value = total;
			
		}
		
		function restart(form,f) {	// 6. Πέρασμα σημαίας
			play = false;
			form.counter.value = 0;
			form.timer.value = 7;
			total = 0;
			seconds=7;
			flag=f;					// 6. Αποθήκευση σημαίας
			window.clearInterval(time);
			document.getElementById("tmr").style.color = "blue";		// Επανεκκίνηση - μπλε
			for (var i = 2; i <= 101; i++) {
			    if (!f)									// 6. f==0
					form.elements[i].checked = false;	//    => restart
				else									// 6. f==1
					form.elements[i].checked = true;	// 6. => reverse
			}
		}