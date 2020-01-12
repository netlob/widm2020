import face_recognition
import cv2
import json
import matplotlib.patches as patches
from IPython.display import clear_output
from matplotlib.pyplot import imshow
import matplotlib.pylab as plt

# Load some sample pictures and learn how to recognize them.
an_image = face_recognition.load_image_file("./img/anita.jpg")
an_face_encoding = face_recognition.face_encodings(an_image)[0]

bu_image = face_recognition.load_image_file("./img/buddy.jpg")
bu_face_encoding = face_recognition.face_encodings(bu_image)[0]

cl_image = face_recognition.load_image_file("./img/claes.jpg")
cl_face_encoding = face_recognition.face_encodings(cl_image)[0]

ja_image = face_recognition.load_image_file("./img/jaike.jpg")
ja_face_encoding = face_recognition.face_encodings(ja_image)[0]

jo_image = face_recognition.load_image_file("./img/johan.jpg")
jo_face_encoding = face_recognition.face_encodings(jo_image)[0]

le_image = face_recognition.load_image_file("./img/leonie.jpg")
le_face_encoding = face_recognition.face_encodings(le_image)[0]

mi_image = face_recognition.load_image_file("./img/miljuschja.jpg")
mi_face_encoding = face_recognition.face_encodings(mi_image)[0]

na_image = face_recognition.load_image_file("./img/nathan.jpg")
na_face_encoding = face_recognition.face_encodings(na_image)[0]

ro_image = face_recognition.load_image_file("./img/rob.jpg")
ro_face_encoding = face_recognition.face_encodings(ro_image)[0]

ti_image = face_recognition.load_image_file("./img/tina.jpg")
ti_face_encoding = face_recognition.face_encodings(ti_image)[0]

known_faces = [
    an_face_encoding,
    bu_face_encoding,
    cl_face_encoding,
    ja_face_encoding,
    jo_face_encoding,
    le_face_encoding,
    mi_face_encoding,
    na_face_encoding,
    ro_face_encoding,
    ti_face_encoding,
]

# Initialize some variables
face_locations = []
face_encodings = []
face_names = []

anita = 0
buddy = 0
claes = 0
jaike = 0
johan = 0
leonie = 0
miljuschja = 0
nathan = 0
rob = 0
tina = 0

# Create an output movie file (make sure resolution/frame rate matches input video!)
fourcc = cv2.VideoWriter_fourcc(*'XVID')
output_movie = cv2.VideoWriter('output-1.avi', fourcc, 25, (640, 360))

# Loading video for face detection
video_capture = cv2.VideoCapture(
    "./episodes/epi-1.mp4")  # Using trailer for now
length = int(video_capture.get(cv2.CAP_PROP_FRAME_COUNT))
print(length)

frame_count = 0
a = False

while video_capture.isOpened():
    # Grab a single frame of video
    ret, frame = video_capture.read()

    # Bail out when the video file ends
    if not ret:
        video_capture.release()
        break

    # We will search face in every 15 frames to speed up process.
    frame_count += 1
    if frame_count % 500 == 0:
        print('{}/{}'.format(frame_count, length))
    if frame_count % 15 == 0:
        # frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Find all the faces and face encodings in the current frame of video
        rgb_frame = frame[:, :, ::-1]
        face_locations = face_recognition.face_locations(rgb_frame)
        face_encodings = face_recognition.face_encodings(
            rgb_frame, face_locations)

        face_names = []
        for face_encoding in face_encodings:
            # See if the face is a match for the known face(s)
            match = face_recognition.compare_faces(
                known_faces, face_encoding, tolerance=0.50)

            name = None
            if match[0]:
                anita += 1
                name = 'anita'
            elif match[1]:
                buddy += 1
                name = 'buddy'
            elif match[2]:
                claes += 1
                name = 'claes'
            elif match[3]:
                jaike += 1
                name = 'jaike'
            elif match[4]:
                johan += 1
                name = 'johan'
            elif match[5]:
                leonie += 1
                name = 'leonie'
            elif match[6]:
                miljuschja += 1
                name = 'miljuschja'
            elif match[7]:
                nathan += 1
                name = 'nathan'
            elif match[8]:
                rob += 1
                name = 'rob'
            elif match[9]:
                tina += 1
                name = 'tina'

            face_names.append(name)

        for (top, right, bottom, left), name in zip(face_locations, face_names):
            if not name:
                continue

            cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

            cv2.rectangle(frame, (left, bottom - 25),
                          (right, bottom), (0, 0, 255), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(frame, name, (left + 6, bottom - 6),
                        font, 0.5, (255, 255, 255), 1)

        # print('writing frame {} / {}'.format(frame_count, length))
        output_movie.write(frame)
cv2.destroyAllWindows()

print(('{' + ('anita:      {},\nbuddy:      {},\nclaes:      {},\njaike:      {},\njohan:      {},\nleonie:     {},\nmiljuschja: {},\nnathan:     {},\nrob:        {},\ntina:       {}').format(
    anita, buddy, claes, jaike, johan, leonie, miljuschja, nathan, rob, tina) + '}'))

data = json.loads(('{' + ('"anita":{},"buddy":{},"claes":{},"jaike":{},"johan":{},"leonie":{},"miljuschja":{},"nathan":{},"rob":{},"tina":{}').format(
    anita, buddy, claes, jaike, johan, leonie, miljuschja, nathan, rob, tina) + '}'))

with open('./data/epi-1.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)
