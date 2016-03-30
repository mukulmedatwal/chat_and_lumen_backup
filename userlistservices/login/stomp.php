 <?php
 $queue  = 'chat.u.g00000000001';

            try {
                $stomp = new Stomp('tcp://192.168.10.223:61616');
                $stomp->subscribe($queue);
                while (true) {
                   if ($stomp->hasFrame()) {
                       $frame = $stomp->readFrame();
                       print_r($frame);
                       if ($frame != NULL) {
                           print "Received: " . $frame->body . " - time now is " . date("Y-m-d H:i:s"). "\n";
                           $stomp->ack($frame);
                       }
                   sleep(1);
                   }
                   else {
                       print "No frames to read\n";
                   }
                }
            } catch(StompException $e) {
                die('Connection failed: ' . $e->getMessage());
            }